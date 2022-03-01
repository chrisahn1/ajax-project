
var targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.setRequestHeader('token', 'abc123');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  // console.log(xhr.response);
  for (var i = 0; i < xhr.response.length; i++) {
    console.log('Species Name: ', xhr.response[i]['Species Name']);
    // console.log('Scientific Name: ', xhr.response[i]['Scientific Name']);
    // console.log('Population: ', xhr.response[i].Population);
    // console.log('Environmental Concerns: ', xhr.response[i]['Environmental Concerns']);
    // console.log('Environmental Effects: ', xhr.response[i]['Environmental Effects']);

    // console.log('Total Fat: ', xhr.response[i]['Total Fat']);
    // console.log('Carbohydrates: ', xhr.response[i].Carbohydrates);
    // console.log('Calories: ', xhr.response[i].Calories);
    // console.log('Cholesterol: ', xhr.response[i].Cholesterol);
    // console.log('Protein: ', xhr.response[i].Protein);
  }

});
xhr.send();
