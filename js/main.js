var search = document.querySelector('.search-button');
var input = document.querySelector('#search-results-form').elements;
var ul = document.querySelector('.results');

search.addEventListener('click', resultSpecies);

function resultSpecies(event) {
  event.preventDefault();
  var targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    var arr = [];

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
}

function appendList(species) {
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

  return li;

}
