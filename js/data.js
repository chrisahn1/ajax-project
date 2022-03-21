/* exported data */
// var data = {
//   view: 'entry-form',
//   entries: [],
//   editing: null,
//   nextEntryId: 1
// };

var data = {
  entries: [],
  nextEntryId: 1
};

var previousTodosJSON = localStorage.getItem('ajax-project');

if (previousTodosJSON !== null) {
  data = JSON.parse(previousTodosJSON);
}

window.addEventListener('beforeunload', storingData);

function storingData(event) {
  var todosJSON = JSON.stringify(data);
  localStorage.setItem('ajax-project', todosJSON);
}
