let searchBtnEl = document.getElementById('search-btn');
const searchInputEl = document.querySelector('#search-input');

//function that calls the relevant functions for searching an anime and displaying it
//and assigns the homepage as the location when search button is pressed
function searchAndDisplay() {
    console.log('search and display');
    searchAnime(filterInput(searchInputEl.value));
    displaySearch();
}



//searches the api for the anime
function searchAnime(searchedAnime) {
    console.log(searchedAnime);
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
    document.querySelector('#aTitle').textContent = 'Title: ' + animeSearch[0].title;
    document.querySelector('#synopsis').textContent = 'Synopsis: ' + animeSearch[0].synopsis;
    document.querySelector('#episodes').textContent = 'Episodes: ' + animeSearch[0].episodes;
    document.querySelector('#malScore').textContent = 'Rating: ' + animeSearch[0].score;
    document.querySelector('#malUrl').setAttribute('href' , animeSearch[0].url);
    document.querySelector('#malUrl').textContent = animeSearch[0].title;
    document.querySelector('#aPoster').setAttribute('src' , animeSearch[0].image_url);
}

function clearDisplay(){
    document.querySelector('#aTitle').textContent = '';
    document.querySelector('#synopsis').textContent = '';
    document.querySelector('#episodes').textContent = '';
    document.querySelector('#malScore').textContent = '';
    document.querySelector('#malUrl').setAttribute('href' , '');
    document.querySelector('#malUrl').textContent = ('');
    document.querySelector('#aPoster').setAttribute('src' , '');
    window.localStorage.removeItem('searchedAnime');
}
clearDisplay();
searchBtnEl.addEventListener('click', searchAndDisplay);