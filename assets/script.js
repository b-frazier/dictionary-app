var searchButton = document.getElementById("search-button");
var wordSearch = document.getElementById("search");
var searchHistory = document.getElementById("search-history");

var searchWord = '';

// search button click and set/display word in history
searchButton.addEventListener("click", function(e){
    e.preventDefault();
    searchWord = wordSearch.value;
    showWordHistory(word);
    setWordHistory(word);
    getWord();
    getPronunciation();
    getDefinition();
});

// set searched word in local storage
function setWordHistory(word) {
  let words = []
  let oldWords = localStorage.getItem("dictionary-app")
  if (oldWords == null) {
    words.push(word)
  } else {
    oldWords = JSON.parse(oldWords)
    oldWords.push(word)
    words = oldWords
  }
  localStorage.setItem("dictionary-app", JSON.stringify(words))
  showWordHistory()
}
// showing searched word max 4, slicing off additional
function showWordHistory() {
  let words = localStorage.getItem("dictionary-app")
  if (words != null) {
    words = JSON.parse(words)
    // this will ensure first searched word will remain at the top of list
    words = words.reverse()
    if (words.length > 4) {
      words = words.slice(0, 4)
    }
    // this is the function that displays searched words
    let layOut = ""
    words.forEach(function (value) {
      layOut += `<p onclick = "displayWord('${value}')">${value}</p>`
    })
    searchHistory.innerHTML = layOut
  }
}

showWordHistory();

let wordText = document.querySelector("#word");


function getWord(){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ searchWord)
    .then(response => response.json())
    .then(findWord)
    .catch(err => console.error(err));
};

function findWord(data){
	for (let i = 0; i < data.length; i++){
		wordText.textContent = data[0].word;
        console.log(data);
	}
};

getWord();

let pronunciation = document.getElementById('pronunciation');

function getPronunciation(){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ searchWord)
    .then(response => response.json())
    .then(findPronunciation)
    .catch(err => console.error(err));
};

function findPronunciation(data){
    for (let i = 0; i < data.length; i++){
        pronunciation.textContent = data[0].phonetic;
    }
};

getPronunciation();

let definition = document.getElementById('definition');

function getDefinition(){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ searchWord)
    .then(response => response.json())
    .then(findDefinition)
    .catch(err => console.error(err));
};

function findDefinition(data){
    for (let i = 0; i < data.length; i++){
        definition.textContent = data[0].meanings[0].definitions[0].definition;
    }
};

getDefinition();

// random word generator
function getRandomWord(){
    fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(response => response.json())
    .then(findRandomWord)
    .catch(err => console.error(err));
}

function findRandomWord(data){
    for (let i = 0; i < data.length; i++){
        wordText.textContent = data[0];
    }
}

getRandomWord();

// random word button
var randomButton = document.getElementById("random-button");

randomButton.addEventListener("click", function(e){
    e.preventDefault();
    getRandomWord();
}

);

// display searched word in search bar
function displayWord(word) {
  wordSearch.value = word
  getWord()
  getPronunciation()
  getDefinition()
}


