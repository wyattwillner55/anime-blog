let searchBtnEl = document.querySelector('#search-btn');
const searchInputEl = document.querySelector('#search-input');
const homepageURL = window.location.href;
let topAnime;
let searchData;

//function that calls the relevant functions for searching an anime and displaying it
//and assigns the homepage as the location when search button is pressed
function searchAndDisplay() {
    location.assign(homepageURL);
    searchAnime(filterInput(searchInputEl.value));
    displaySearch();
}

//function that calls all the relevant functions for setting up the homepage top anime display
/*function setUpHomepage() {
    getTopAnime();
    
}*/

//fetches the top anime from jikan api
/*async function getTopAnime(){
    const response = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
    topAnime = await response.json();
    console.log(topAnime);
    topAnime = topAnime.top.slice(0,5);
    for (i = 0; i < 4; i++) {
        console.log('topAnime' + i);
        window.localStorage.setItem('topAnime' + i , JSON.stringify(topAnime[i]));
    }
}
*/

//searches the api for the anime
function searchAnime(searchedAnime) {
    fetch('https://api.jikan.moe/v3/search/anime?q=' + searchedAnime + '&order_by=title&sort=asc&limit=1')
        .then(function(response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(searchedData){
            window.localStorage.setItem('searchedAnime' , JSON.stringify(searchedData));
        })
}

//replaces unsearchable characters in the string with characters that can be used in a search
function filterInput(inputString) {
    return inputString.replaceAll(' ' , '_');
}

//displays the searched anime
function displaySearch() {
    const searchedAnime = JSON.parse(window.localStorage.getItem('searchedAnime'));
    document.querySelector('#aTitle').textContent = 'Title:' + searchedAnime.title;
    document.querySelector('#synopsis').textContent = 'Synopsis:' + searchedAnime.synopsis;
    document.querySelector('#episodes').textContent = 'Episodes:' + searchedAnime.episodes;
    document.querySelector('#malScore').textContent = 'Rating:' + searchedAnime.score;
    document.querySelector('#malUrl').setAttribute('href' , searchedAnime.url);
    document.querySelector('#malUrl').setAttribute('target' , searchedAnime.title);
    document.querySelector('#aPoster').setAttribute('src' , searchedAnime.image_url);
}

//displays the top anime in their locations
/*
function displayHomepageAnime(animeNumber){
    const animeInfo = JSON.parse(window.localStorage.getItem('topAnime' + animeNumber));
    let animeObj = `${animeNumber}`;
    let animeImage = `${animeNumber}` + 'i';
    console.log(animeNumber);
    console.log(topAnime[animeNumber].url);
    console.log(topAnime[animeNumber].title);
    console.log(topAnime[animeNumber].image);
    document.getElementById(animeObj).setAttribute('href' , animeInfo.url);
    document.getElementById(animeObj).setAttribute('target' , animeInfo.title);
    document.getElementById(animeImage).setAttribute('src' , animeInfo.image_url);
}
*/
//clears display
/*
function clearDisplayData() {
    document.querySelector('#aTitle').textContent = 'Title:' + '';
    document.querySelector('#synopsis').textContent = 'Synopsis:' + '';
    document.querySelector('#episodes').textContent = 'Episodes:' + '';
    document.querySelector('#malScore').textContent = 'Rating:' + '';
    document.querySelector('#malUrl').setAttribute('href' , '');
    document.querySelector('#malUrl').setAttribute('target' , '');
    document.querySelector('#aPoster').setAttribute('src' , '');
}
*/