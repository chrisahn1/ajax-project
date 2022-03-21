var search = document.querySelector('.search-button');
var input = document.querySelector('#search-results-form').elements;
// var ul = document.querySelector('.results');
var searchResultTree = document.querySelector('.search-result-tree');
// var fishInfoContainer = document.querySelector('.fish-info-container');

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

  obj['Species Name'] = species['Species Name'];
  obj['Species Illustration Photo'] = species['Species Illustration Photo'].src;
  obj['Scientific Name'] = species['Scientific Name'];

  // Section 2
  // If/Else statements if n/a
  // Population
  // Habitat Impacts
  // Fishing Rate
  // Bycatch

  // Environmental Considerations
  // Farming Methods
  // Feeds
  // Human Health

  // Section 3
  obj.Availability = species.Availability;
  obj.Taste = species.Taste;
  obj.Source = species.Source;
  obj['Health Benefits'] = species['Health Benefits'];

  // Section 4
  // If/Else Fishery Management or Management
  // Physical Description
  // Biology
  // Research

  nutrition.Servings = species.Servings;
  nutrition['Serving Weight'] = species['Serving Weight'];
  nutrition.Calories = species.Calories;
  nutrition.Protein = species.Protein;
  nutrition['Fat, Total'] = species['Fat, Total'];
  nutrition['Saturated Fatty Acids, Total'] = species['Saturated Fatty Acids, Total'];
  nutrition.Carbohydrates = species.Carbohydrates;
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
  // ul.className = 'results hidden';

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
}
