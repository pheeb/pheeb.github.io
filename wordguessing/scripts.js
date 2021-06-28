const wordToGuess = "durian"

const wordState = [];

let guessesLeft = 10;

const prevGuesses = [];

//display b_n_n_ _
function displayWordState(state){
	let output = '';

	for(let i = 0; i < state.length; i++){
		const char = state[i];
		/*if(char != undefined){*/
			output = output + char
		/*}
		else {
			output = output + '_'
		}*/
			output = output + ' ';
	}



	const wordStateContainer = document.getElementById('word');
	wordStateContainer.innerHTML = output;
} 

function displayGuessesLeft(num){
	document.getElementById('guesses-left').innerHTML = num;
}

function displayPreviousGueesses(guessesArray){
	const list = document.getElementById('past-guesses');
	//clear list before adding guesses
	list.innerHTML = '';

	//for each guess, append a li child
	for(let i = 0; i < guessesArray.length; i++){
		const guess = document.createElement('li');
		guess.innerHTML = guessesArray[i];	
		list.appendChild(guess)
	}
}
//takes in word to guess, the current state of the word and the new character to guess
function guess(wordToGuess, wordState, currGuess){
	//for each character in the word to be guessed
	for(let i=0; i < wordToGuess.length; i++){
		//if the character matches the current guess,
		//update wordstate at that position
		if(wordToGuess[i] == currGuess){
			wordState[i] = currGuess;
		}
		console.log(wordToGuess[i]);
	}

	displayWordState(wordState);
}

function checkWon(wordState){
	for(let i = 0; i < wordState.length; i++){
		//if any parts of wordState has blank, return true
		if(wordState[i] == '_'){
			return false;
		}
	}
	return true;
	//console.log('hasblanks',hasBlanks);
}

function setup(){
	for(let i = 0; i < wordToGuess.length; i++){
		wordState.push('_')
	}

	displayGuessesLeft(guessesLeft);
	displayWordState(wordState);
	displayPreviousGueesses(prevGuesses);
}

function setupForm(){

	const form = document.getElementById('player-input');
	const input = document.getElementById('player-guess');

	form.onsubmit = function(event){
		event.preventDefault();
		const currentInput = input.value.toLowerCase();

		//clear input field
		input.value = '';
		//check if input is valid
		if(!validateInput(currentInput, prevGuesses)){
			window.alert('Please choose a character from a-z that has not been guesssed before.')
			return;
		}

		
		

		//add guess to previous guesses
		prevGuesses.push(currentInput);
		//update guesses left
		guessesLeft = guessesLeft - 1;
		displayGuessesLeft(guessesLeft);

	//	console.log(input.value);
	//	console.log(event.target);

		//make guess
		guess(wordToGuess, wordState, currentInput);

		const won = checkWon(wordState);
		if(won){
			window.alert('You won!')
		} else if(guessesLeft == 0){
			window.alert('You Lost!')
		}

		
		//update previous guesses
		displayPreviousGueesses(prevGuesses);
	}
}
//guess(wordToGuess, wordState, 'a');

//updated word state
	
//displayGuessesLeft(guessesLeft);
//displayPreviousGueesses(prevGuesses);

//add form submit handler


//initial setup

//if guess is a valid choice, then return true, else return false
function validateInput(guess, prevGuesses){
	//check that guess is one character
	//user has not guessed this before

	if(guess.length == 1 && prevGuesses.indexOf(guess) == -1){
		return true;
	}
		return false;

}


setup();
setupForm();