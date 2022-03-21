var search = document.querySelector('.search-button');
var input = document.querySelector('#search-results-form').elements;
// var ul = document.querySelector('.results');
var searchResultTree = document.querySelector('.search-result-tree');
var fishInfoContainer = document.querySelector('.fish-info-container');

search.addEventListener('click', resultSpecies);
searchResultTree.addEventListener('click', infoSpecies);

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
    obj['Environmental Considerations'] = species['Environmental Considerations'];
  } else {
    obj.Population = species.Population;
  }

  if (typeof species['Habitat Impacts'] === 'undefined' || species['Habitat Impacts'] === null) {
    obj['Farming Methods'] = species['Farming Methods'];
  } else {
    obj['Habitat Impacts'] = species['Habitat Impacts'];
  }

  if (typeof species['Fishing Rate'] === 'undefined' || species['Fishing Rate'] === null) {
    obj.Feeds = species.Feeds;
  } else {
    obj['Fishing Rate'] = species['Fishing Rate'];
  }

  if (typeof species.Bycatch === 'undefined' || species.Bycatch === null) {
    obj['Human Health'] = species['Human Health'];
  } else {
    obj.Bycatch = species.Bycatch;
  }

  // Section 3
  obj.Availability = species.Availability;
  obj.Taste = species.Taste;
  obj.Source = species.Source;
  obj['Health Benefits'] = species['Health Benefits'];

  // Section 4
  if (typeof species['Fishery Management'] === 'undefined' || species['Fishery Management'] === null) {
    obj.Management = species.Management;
  } else {
    obj['Fishery Management'] = species['Fishery Management'];
  }

  obj['Physical Description'] = species['Physical Description'];
  obj.Biology = species.Biology;
  obj.Research = species.Research;

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

  // ul.className = 'results hidden';

  var fish = {};

  for (var i = 0; i < data.entries.length; i++) {
    if (event.target.closest('.species-box').id === data.entries[i]['Species Name']) {
      fish = data.entries[i];
      break;
    }
  }

  // console.log(event.target.closest('.species-box').id);
  // console.log(data.entries);

  var sectionOne = document.createElement('div');
  var sectionTwo = document.createElement('div');
  var sectionThree = document.createElement('div');
  var sectionFour = document.createElement('div');

  var sectionHalf1 = document.createElement('div');
  var sectionHalf2 = document.createElement('div');
  var sectionFourth1 = document.createElement('div');
  var sectionFourth2 = document.createElement('div');
  var sectionFourth3 = document.createElement('div');
  var sectionFourth4 = document.createElement('div');

  sectionOne.setAttribute('class', 'section-one');
  sectionTwo.setAttribute('class', 'section-two');
  sectionThree.setAttribute('class', 'section-three');
  sectionFour.setAttribute('class', 'section-four');

  sectionHalf1.setAttribute('class', 'section-half');
  sectionHalf2.setAttribute('class', 'section-half');

  sectionFourth1.setAttribute('class', 'section-fourth');
  sectionFourth2.setAttribute('class', 'section-fourth');
  sectionFourth3.setAttribute('class', 'section-fourth');
  sectionFourth4.setAttribute('class', 'section-fourth');

  var speciesName = document.createElement('h3');
  speciesName.textContent = fish['Species Name'];

  var scienceName = document.createElement('h3');
  scienceName.textContent = fish['Scientific Name'];

  var nutrition = document.createElement('a');
  nutrition.textContent = 'Nutrition';

  sectionOne.appendChild(speciesName);
  sectionOne.appendChild(scienceName);
  sectionOne.appendChild(nutrition);

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

  fishInfoContainer.appendChild(sectionOne);
  fishInfoContainer.appendChild(sectionTwo);

  fishInfoContainer.className = 'fish-info-container';
  searchResultTree.className = 'search-result-tree hidden';
}
