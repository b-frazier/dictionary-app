var word = "";
var searchButton = document.getElementById("searched-button");
var wordSearch = document.getElementById("search-input");
var searchHistory = document.getElementById("search-history");

// search button click and set/display word in history
searchButton.addEventListener("click", function(e) {
    word = wordSearch.value;
    displayWord(word);
    setWordHistory(word);
})

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

showWordHistory()