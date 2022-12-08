var searchButton = document.getElementById("searched-button");
var wordSearch = document.getElementById("search");
var searchHistory = document.getElementById("search-history");

var word = wordSearch.value;

// set searched word in local storage
function setWordHistory(word) {
    let words = []
    let oldWords = localStorage.getItem("dictionary-app") 
      if (oldWords == null) {
          words.push(word)
          }
      else {
          oldWords = JSON.parse(oldWords)
          oldWords.push(word)
          words = oldWords
      }
      localStorage.setItem("dictionary-app" ,JSON.stringify(words))
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
            words.forEach(function(value){
                layOut+= `<p onclick = "displayWord('${value}')">${value}</p>`
            })
         searchHistory.innerHTML = layOut   
        }
}

// search button click and set/display word in history
// searchButton.addEventListener("click", function(e){
//     e.preventDefault();
//     showWordHistory(word);
//     setWordHistory(word);
// })

// showWordHistory();

let text = document.querySelector("#word");

let temp = 'play'

function getWord(){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ temp)
    .then(response => response.json())
    .then(findWord)
    .catch(err => console.error(err));


};

function findWord(data){
	for (let i = 0; i < data.length; i++){
		text.textContent = data[0].word;
        console.log(data);
	}
};

getWord();

function getPronunciation(){

}
