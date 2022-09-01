let searchBtnEl = document.querySelector('#search-btn');
const searchInputEl = document.querySelector('#search-input');
const homepageURL = window.location.href;
let topAnime;
let searchData;

//function that calls the relevant functions for searching an anime and displaying it
//and assigns the homepage as the location when search button is pressed
function searchAndDisplay() {
    location.assign(homepageURL);
    searchAnime(filterInput(searchInputEl.textContent));
    displaySearch();
}

//function that calls all the relevant functions for setting up the homepage top anime display
function setUpHomepage() {
    getTopAnime();
    for (i = 0; i < 4; i++) {
        displayHomepageAnime(i);
    }
}

//fetches the top anime from jikan api
async function getTopAnime(){
    const response = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
    topAnime = await response.json();
    console.log(topAnime);
    topAnime = topAnime.top.slice(0,5);
}

//searches the api for the anime
async function searchAnime(searchedAnime) {
    const response = await fetch('https://api.jikan.moe/v3/search/anime?q=' + searchedAnime + '&order_by=title&sort=asc&limit=1')
       searchData = await response.json();
    
}

//replaces unsearchable characters in the string with characters that can be used in a search
function filterInput(inputString) {
    return inputString.replaceAll(' ' , '_');
}

//displays the searched anime
function displaySearch() {
    document.querySelector('#aTitle').textContent = 'Title:' + searchData.title;
    document.querySelector('#synopsis').textContent = 'Synopsis:' + searchData.synopsis;
    document.querySelector('#episodes').textContent = 'Episodes:' + searchData.episodes;
    document.querySelector('#malScore').textContent = 'Rating:' + searchData.score;
    document.querySelector('#malUrl').setAttribute('href' , searchData.url);
    document.querySelector('#malUrl').setAttribute('target' , searchData.title);
    document.querySelector('#aPoster').setAttribute('src' , searchData.image_url);
}

//displays the top anime in their locations
function displayHomepageAnime(animeNumber){
    let animeObj = `${animeNumber}`;
    let animeImage = `${animeNumber}` + 'i';
    console.log(topAnime[animeNumber].url);
    console.log(topAnime[animeNumber].title);
    console.log(topAnime[animeNumber].image);
    document.getElementById(animeObj).setAttribute('href' , topAnime[animeNumber].url);
    document.getElementById(animeObj).setAttribute('target' , topAnime[animeNumber].title);
    document.getElementById(animeImage).setAttribute('src' , topAnime[animeNumber].image_url);
}


//clears display
function clearDisplayData() {
    document.querySelector('#aTitle').textContent = 'Title:' + '';
    document.querySelector('#synopsis').textContent = 'Synopsis:' + '';
    document.querySelector('#episodes').textContent = 'Episodes:' + '';
    document.querySelector('#malScore').textContent = 'Rating:' + '';
    document.querySelector('#malUrl').setAttribute('href' , '');
    document.querySelector('#malUrl').setAttribute('target' , '');
    document.querySelector('#aPoster').setAttribute('src' , '');
}

setUpHomepage();
searchBtnEl.addEventListener('click', searchAndDisplay());