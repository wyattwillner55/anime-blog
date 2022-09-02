let searchBtnEl = document.getElementById('search-btn');
const searchInputEl = document.querySelector('#search-input');
const homepageURL = window.location.href;
let topAnime;
let searchData;

//function that calls the relevant functions for searching an anime and displaying it
//and assigns the homepage as the location when search button is pressed
function searchAndDisplay() {
    console.log('search and display');
    searchAnime(filterInput(searchInputEl.value));
    displaySearch();
}



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
            window.localStorage.setItem('searchedAnime' , JSON.stringify(searchedData.results));
        })
}

//replaces unsearchable characters in the string with characters that can be used in a search
function filterInput(inputString) {
    return inputString.replaceAll(' ' , '_');
}

//displays the searched anime
function displaySearch() {
    let animeSearch = JSON.parse(window.localStorage.getItem('searchedAnime'));
    console.log(animeSearch);
    document.querySelector('#aTitle').textContent = 'Title:' + animeSearch.title;
    document.querySelector('#synopsis').textContent = 'Synopsis:' + animeSearch.synopsis;
    document.querySelector('#episodes').textContent = 'Episodes:' + animeSearch.episodes;
    document.querySelector('#malScore').textContent = 'Rating:' + animeSearch.score;
    document.querySelector('#malUrl').setAttribute('href' , animeSearch.url);
    document.querySelector('#malUrl').setAttribute('target' , animeSearch.title);
    document.querySelector('#aPoster').setAttribute('src' , animeSearch.image_url);
}
searchBtnEl.addEventListener('click', searchAndDisplay);