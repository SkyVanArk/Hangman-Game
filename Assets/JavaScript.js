var spookyWords = ["spooky","noose","hangman","terror","fright","horror"]

var pickedWord = "";
var lettersInPickedWord = [];
var numberBlanks = 0;
var inProgress = [];
var incorrectGuesses = [];

var countWins = 0;
var countLoss = 0;
var countGuess = 10;


function gameStart(){
    incorrectGuesses = [];
    console.log("there have been this many wrong guesses in gameStart:", incorrectGuesses);
    countGuess = 10;
    inProgress = [];

    pickedWord = spookyWords[Math.floor(Math.random() * spookyWords.length)];
    lettersInPickedWord = pickedWord.split("");
    numberBlanks = pickedWord.length;
    console.log(pickedWord);
    console.log(numberBlanks);

    for(var i = 0; i < numberBlanks; i++){
        inProgress.push("_");
    }

    console.log(inProgress);
    document.getElementById('word-blank').innerHTML = inProgress.join(" ");
    document.getElementById('guesses-left').innerHTML = countGuess;

}


function validateLetter(letter){
    var wordLetter = false;

    for(var i = 0; i < numberBlanks; i++){
        if(pickedWord[i] === letter){
            wordLetter = true;
        }
    }

        if(wordLetter){
            for(i = 0; i < numberBlanks; i++){
                if(pickedWord[i] === letter){
                    inProgress[i] = letter;
                }
            }
        }

        else{
            countGuess --;
            incorrectGuesses.push(letter);
        }
}


function roundOver(){
    document.getElementById('word-blank').innerHTML = inProgress.join(" ");
    document.getElementById('guesses-left').innerHTML = countGuess;
    document.getElementById('wrong-guesses').innerHTML = incorrectGuesses.join(" ");



    console.log(lettersInPickedWord);
    console.log(inProgress);
    if(lettersInPickedWord.join(" ") === inProgress.join (" ")){
        countWins++;
        alert("WINNER!");
        document.getElementById('win-counter').innerHTML = countWins;
        gameStart();
    }

    else if(countGuess === 0){
        document.getElementById('loss-counter').innerHTML = countLoss ++;
        document.getElementById('wrong-guesses').innerHTML = "";
        alert("you are out of guesses");
        gameStart();
    }

}

gameStart();
document.onkeyup = function(event){
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    console.log("this letter was typed", letterGuessed)
    validateLetter(letterGuessed);
    roundOver();
}