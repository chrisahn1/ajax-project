var search = document.querySelector('.search-button');
var input = document.querySelector('#search-results-form').elements;
// var ul = document.querySelector('.results');
var searchResultTree = document.querySelector('.search-result-tree');
var fishInfoContainer = document.querySelector('.fish-info-container');

search.addEventListener('click', resultSpecies);
searchResultTree.addEventListener('click', infoSpecies);

// var nutritionButton = document.querySelector('.nutrition-button');
var exitNutrition = document.querySelector('.close-button-nutrition');
var exitGallery = document.querySelector('.close-button-gallery');
var boxNutrition = document.querySelector('.box-nutrition');
var boxGallery = document.querySelector('.box-gallery');

// nutritionButton.addEventListener('click', nutritionModal);
exitNutrition.addEventListener('click', exitModalNutrition);
exitGallery.addEventListener('click', exitModalGallery);

var nutritionalFacts = document.querySelector('.nutritional-facts');
var photoGallery = document.querySelector('.photo-gallery');

function resultSpecies(event) {
  event.preventDefault();

  while (searchResultTree.firstElementChild) {
    searchResultTree.firstElementChild.remove();
  }

  var ul = document.createElement('ul');
  ul.className = 'results';

  var targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    var arr = [];
    data.entries = [];
    for (var i = 0; i < xhr.response.length; i++) {
      arr = xhr.response[i]['Species Name'].split(' ');
      if (input[0].value === xhr.response[i]['Species Name']) {
        ul.appendChild(appendList(xhr.response[i]));
        break;
      }
      if (arr.includes(input[0].value)) {
        ul.appendChild(appendList(xhr.response[i]));
        continue;
      }
    }

  });
  xhr.send();
  searchResultTree.appendChild(ul);

  fishInfoContainer.className = 'fish-info-container hidden';
  searchResultTree.className = 'search-result-tree';
  // ul.className = 'results';
}

function appendList(species) {
  event.preventDefault();
  var obj = {};
  var nutrition = {};
  var imageGallery = [];

  var li = document.createElement('li');
  li.setAttribute('class', 'species-box');
  li.setAttribute('id', species['Species Name']);

  var image = document.createElement('div');
  image.setAttribute('class', 'species-image');

  var img = document.createElement('img');
  img.src = species['Species Illustration Photo'].src;

  image.appendChild(img);

  var name = document.createElement('h3');
  name.setAttribute('class', 'name');

  name.textContent = species['Species Name'];

  var alias = document.createElement('a');
  alias.setAttribute('href', species['Species Aliases'].href);

  li.appendChild(image);
  li.appendChild(name);
  li.appendChild(alias);

  // Section 1
  obj['Species Name'] = species['Species Name'];
  obj['Species Illustration Photo'] = species['Species Illustration Photo'].src;
  obj['Scientific Name'] = species['Scientific Name'];
  obj.Quote = species.Quote;

  // Section 2
  if (typeof species.Population === 'undefined' || species.Population === null) {
    obj.Population = 'n/a';
  } else {
    obj.Population = species.Population;
  }

  if (typeof species['Habitat Impacts'] === 'undefined' || species['Habitat Impacts'] === null) {
    obj['Habitat Impacts'] = 'n/a';
  } else {
    obj['Habitat Impacts'] = species['Habitat Impacts'];
  }

  if (typeof species['Fishing Rate'] === 'undefined' || species['Fishing Rate'] === null) {
    obj['Fishing Rate'] = 'n/a';
  } else {
    obj['Fishing Rate'] = species['Fishing Rate'];
  }

  if (typeof species.Bycatch === 'undefined' || species.Bycatch === null) {
    obj.Bycatch = 'n/a';
  } else {
    obj.Bycatch = species.Bycatch;
  }

  // Section 3
  obj.Availability = species.Availability;
  obj.Taste = species.Taste;
  obj.Source = species.Source;
  obj['Health Benefits'] = species['Health Benefits'];

  // Section 4
  for (var i = 0; i < species['Image Gallery'].length; i++) {
    imageGallery.push(species['Image Gallery'][0].src);
  }

  obj.ImageGallery = imageGallery;

  nutrition.Servings = species.Servings;
  nutrition['Serving Weight'] = species['Serving Weight'];
  nutrition.Calories = species.Calories;
  nutrition.Protein = species.Protein;
  nutrition['Fat, Total'] = species['Fat, Total'];
  nutrition['Saturated Fatty Acids, Total'] = species['Saturated Fatty Acids, Total'];
  nutrition['Sugars, Total'] = species['Sugars, Total'];
  nutrition['Fiber, Total Dietary'] = species['Fiber, Total Dietary'];
  nutrition.Cholesterol = species.Cholesterol;
  nutrition.Sodium = species.Sodium;

  obj.Nutrition = nutrition;

  data.entries.unshift(obj);

  return li;

}

function infoSpecies(event) {
  event.preventDefault();

  while (fishInfoContainer.firstElementChild) {
    fishInfoContainer.firstElementChild.remove();
  }

  while (nutritionalFacts.firstElementChild) {
    nutritionalFacts.firstElementChild.remove();
  }

  while (photoGallery.firstElementChild) {
    photoGallery.firstElementChild.remove();
  }

  var fish = {};

  for (var i = 0; i < data.entries.length; i++) {
    if (event.target.closest('.species-box').id === data.entries[i]['Species Name']) {
      fish = data.entries[i];
      break;
    }
  }

  // console.log(event.target.closest('.species-box').id);
  // console.log(data.entries);

  var sectionOne = document.createElement('section');
  var sectionTwo = document.createElement('section');
  var sectionThree = document.createElement('section');
  var sectionFour = document.createElement('section');

  sectionOne.setAttribute('class', 'section-one');
  sectionTwo.setAttribute('class', 'section-two');
  sectionThree.setAttribute('class', 'section-three');
  sectionFour.setAttribute('class', 'section-four');

  var speciesName = document.createElement('h2');
  speciesName.textContent = fish['Species Name'];

  var scienceName = document.createElement('h2');
  scienceName.className = 'scientific-name';
  scienceName.textContent = fish['Scientific Name'];

  var buttons = document.createElement('div');
  buttons.className = 'button-section';

  var nutritionButton = document.createElement('button');
  nutritionButton.className = 'nutrition-button';
  nutritionButton.textContent = 'Nutrition';

  var galleryButton = document.createElement('button');
  galleryButton.className = 'gallery-button';
  galleryButton.textContent = 'Gallery';

  buttons.appendChild(nutritionButton);
  buttons.appendChild(galleryButton);

  nutritionButton.addEventListener('click', nutritionModal);
  galleryButton.addEventListener('click', galleryModal);

  // Nutritional Facts
  nutritionCreate(fish);

  sectionOne.appendChild(speciesName);
  sectionOne.appendChild(scienceName);
  sectionOne.appendChild(buttons);

  var imageDiv = document.createElement('div');
  imageDiv.className = 'fish-info-image';
  var image = document.createElement('img');
  image.className = 'species-image';
  image.src = fish['Species Illustration Photo'];

  imageDiv.appendChild(image);

  var quoteDiv = document.createElement('div');
  quoteDiv.className = 'fish-info-description';
  var description = document.createElement('p');
  description.textContent = fish.Quote;
  quoteDiv.appendChild(description);

  sectionTwo.appendChild(imageDiv);
  sectionTwo.appendChild(quoteDiv);

  var ul1 = document.createElement('ul');
  ul1.className = 'section-two-a';
  var ul2 = document.createElement('ul');
  ul2.className = 'section-two-b';

  // First Half of UL
  var li11 = document.createElement('li');
  li11.className = 'fish-list';
  var h211 = document.createElement('h3');
  var p11 = document.createElement('p');
  h211.textContent = 'Population';
  p11.textContent = fish.Population;
  li11.appendChild(h211);
  li11.appendChild(p11);
  ul1.appendChild(li11);

  var li12 = document.createElement('li');
  li12.className = 'fish-list';
  var h212 = document.createElement('h3');
  var p12 = document.createElement('p');
  h212.textContent = 'Habitat Impacts';
  p12.textContent = fish['Habitat Impacts'];
  li12.appendChild(h212);
  li12.appendChild(p12);
  ul1.appendChild(li12);

  var li13 = document.createElement('li');
  li13.className = 'fish-list';
  var h213 = document.createElement('h3');
  var p13 = document.createElement('p');
  h213.textContent = 'Fishing Rate';
  p13.textContent = fish['Fishing Rate'];
  li13.appendChild(h213);
  li13.appendChild(p13);
  ul1.appendChild(li13);

  var li14 = document.createElement('li');
  li14.className = 'fish-list';
  var h214 = document.createElement('h3');
  var p14 = document.createElement('p');
  h214.textContent = 'Bycatch';
  p14.textContent = fish.Bycatch;
  li14.appendChild(h214);
  li14.appendChild(p14);
  ul1.appendChild(li14);

  // Second Half of UL
  var li21 = document.createElement('li');
  li21.className = 'fish-list';
  var h221 = document.createElement('h3');
  var p21 = document.createElement('p');
  h221.textContent = 'Availability';
  p21.textContent = fish.Availability;
  li21.appendChild(h221);
  li21.appendChild(p21);
  ul2.appendChild(li21);

  var li22 = document.createElement('li');
  li22.className = 'fish-list';
  var h222 = document.createElement('h3');
  var p22 = document.createElement('p');
  h222.textContent = 'Taste';
  p22.textContent = fish.Taste;
  li22.appendChild(h222);
  li22.appendChild(p22);
  ul2.appendChild(li22);

  var li23 = document.createElement('li');
  li23.className = 'fish-list';
  var h223 = document.createElement('h3');
  var p23 = document.createElement('p');
  h223.textContent = 'Source';
  p23.textContent = fish.Source;
  li23.appendChild(h223);
  li23.appendChild(p23);
  ul2.appendChild(li23);

  var li24 = document.createElement('li');
  li24.className = 'fish-list';
  var h224 = document.createElement('h3');
  var p24 = document.createElement('p');
  h224.textContent = 'Health Benefits';
  p24.textContent = fish['Health Benefits'];
  li24.appendChild(h224);
  li24.appendChild(p24);
  ul2.appendChild(li24);

  sectionThree.appendChild(ul1);
  sectionThree.appendChild(ul2);

  galleryCreate(fish.ImageGallery);

  // sectionFour.appendChild(article1);
  // sectionFour.appendChild(article2);
  // sectionFour.appendChild(article3);
  // sectionFour.appendChild(article4);

  fishInfoContainer.appendChild(sectionOne);
  fishInfoContainer.appendChild(sectionTwo);
  fishInfoContainer.appendChild(sectionThree);
  // fishInfoContainer.appendChild(sectionFour);

  fishInfoContainer.className = 'fish-info-container';
  searchResultTree.className = 'search-result-tree hidden';
}

function nutritionModal(event) {
  search.disabled = true;
  boxNutrition.className = 'box-nutrition open';
}

function exitModalNutrition(event) {
  search.disabled = false;
  boxNutrition.className = 'box-nutrition closed';
}

function galleryModal(event) {
  search.disabled = true;
  boxGallery.className = 'box-gallery open';
}

function exitModalGallery(event) {
  search.disabled = false;
  boxGallery.className = 'box-gallery closed';
}

function nutritionCreate(fish) {
  var servingsDiv = document.createElement('div');
  servingsDiv.className = 'nutrition-attribute';
  var servings = document.createElement('h3');
  servings.textContent = 'SERVINGS';
  var servingsAmount = document.createElement('p');
  servingsAmount.textContent = fish.Nutrition.Servings;
  servingsDiv.appendChild(servings);
  servingsDiv.appendChild(servingsAmount);
  nutritionalFacts.appendChild(servingsDiv);

  var servingWeightDiv = document.createElement('div');
  servingWeightDiv.className = 'nutrition-attribute';
  var servingWeight = document.createElement('h3');
  servingWeight.textContent = 'SERVING WEIGHT';
  var servingWeightAmount = document.createElement('p');
  servingWeightAmount.textContent = fish.Nutrition['Serving Weight'];
  servingWeightDiv.appendChild(servingWeight);
  servingWeightDiv.appendChild(servingWeightAmount);
  nutritionalFacts.appendChild(servingWeightDiv);

  var caloriesDiv = document.createElement('div');
  caloriesDiv.className = 'nutrition-attribute';
  var calories = document.createElement('h3');
  calories.textContent = 'CALORIES';
  var caloriesAmount = document.createElement('p');
  caloriesAmount.textContent = fish.Nutrition.Calories;
  caloriesDiv.appendChild(calories);
  caloriesDiv.appendChild(caloriesAmount);
  nutritionalFacts.appendChild(caloriesDiv);

  var proteinDiv = document.createElement('div');
  proteinDiv.className = 'nutrition-attribute';
  var protein = document.createElement('h3');
  protein.textContent = 'PROTEIN';
  var proteinAmount = document.createElement('p');
  proteinAmount.textContent = fish.Nutrition.Protein;
  proteinDiv.appendChild(protein);
  proteinDiv.appendChild(proteinAmount);
  nutritionalFacts.appendChild(proteinDiv);

  var fatDiv = document.createElement('div');
  fatDiv.className = 'nutrition-attribute';
  var fat = document.createElement('h3');
  fat.textContent = 'FAT, TOTAL';
  var fatAmount = document.createElement('p');
  fatAmount.textContent = fish.Nutrition['Fat, Total'];
  fatDiv.appendChild(fat);
  fatDiv.appendChild(fatAmount);
  nutritionalFacts.appendChild(fatDiv);

  var acidDiv = document.createElement('div');
  acidDiv.className = 'nutrition-attribute';
  var acid = document.createElement('h3');
  acid.textContent = 'SATURATED FATTY ACIDS, TOTAL';
  var acidAmount = document.createElement('p');
  acidAmount.textContent = fish.Nutrition['Saturated Fatty Acids, Total'];
  acidDiv.appendChild(acid);
  acidDiv.appendChild(acidAmount);
  nutritionalFacts.appendChild(acidDiv);

  var sugarDiv = document.createElement('div');
  sugarDiv.className = 'nutrition-attribute';
  var sugar = document.createElement('h3');
  sugar.textContent = 'SUGARS, TOTAL';
  var sugarAmount = document.createElement('p');
  sugarAmount.textContent = fish.Nutrition['Sugars, Total'];
  sugarDiv.appendChild(sugar);
  sugarDiv.appendChild(sugar);
  nutritionalFacts.appendChild(sugarDiv);

  var fiberDiv = document.createElement('div');
  fiberDiv.className = 'nutrition-attribute';
  var fiber = document.createElement('h3');
  fiber.textContent = 'FIBER, TOTAL DIETARY';
  var fiberAmount = document.createElement('p');
  fiberAmount.textContent = fish.Nutrition['Fiber, Total Dietary'];
  fiberDiv.appendChild(fiber);
  fiberDiv.appendChild(fiberAmount);
  nutritionalFacts.appendChild(fiberDiv);

  var cholesterolDiv = document.createElement('div');
  cholesterolDiv.className = 'nutrition-attribute';
  var cholesterol = document.createElement('h3');
  cholesterol.textContent = 'CHOLESTEROL';
  var cholesterolAmount = document.createElement('p');
  cholesterolAmount.textContent = fish.Nutrition.Cholesterol;
  cholesterolDiv.appendChild(cholesterol);
  cholesterolDiv.appendChild(cholesterolAmount);
  nutritionalFacts.appendChild(cholesterolDiv);

  var sodiumDiv = document.createElement('div');
  sodiumDiv.className = 'nutrition-attribute';
  var sodium = document.createElement('h3');
  sodium.textContent = 'SODIUM';
  var sodiumAmount = document.createElement('p');
  sodiumAmount.textContent = fish.Nutrition.Sodium;
  sodiumDiv.appendChild(sodium);
  sodiumDiv.appendChild(sodiumAmount);
  nutritionalFacts.appendChild(sodiumDiv);
}

function galleryCreate(gallery) {
  for (var i = 0; i < gallery.length; i++) {
    var div = document.createElement('div');
    var image = document.createElement('img');
    image.className = 'fish-info-image';
    image.src = gallery[i];

    div.appendChild(image);
    photoGallery.appendChild(div);
  }
}
