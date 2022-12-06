let text = document.querySelector("#word");
let word = 'riot';

function getWord(){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ word)
    .then(response => response.json())
    .then(findWord)
    .catch(err => console.error(err));
};

function findWord(data){
	for (let i = 0; i < data.length; i++){
		text.textContent = data[i].word;
	}
};

getWord();