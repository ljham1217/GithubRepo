'use strict';
const searchURL="https://api.github.com/search/repositories";

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#js-user-name').val();
    getRepos(userName);
  });
};

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function getRepos(userName) {
  console.log(userName)
  const params = {
    q: `user:${userName}`,
  }
  console.log(params);

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error (response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson){
console.log(responseJson);
$('#results-list').empty();
for (let i=0; i < responseJson.items.length; i++){
 $('#results-list').append(
  `<li>
  <h3><a href="${responseJson.items[i].html_url}">${responseJson.items[i].name}</a></h3>
  <p>${responseJson.items[i].description}</p>
  </li>`
  )};
  $('#results').removeClass('hidden');
};

$(function(){
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
