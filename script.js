let cardsNumber = 0;
let correctCards = [];
let clickedCards = [];
let round = 0;
let time = 0;
let idInterval; 
let gameCards = [];
let originalCards = ['bobrossparrot.gif', 'explodyparrot.gif', 
    'fiestaparrot.gif', 'metalparrot.gif',
    'revertitparrot.gif', 'tripletsparrot.gif', 
    'unicornparrot.gif'];


function title(){
    const title = document.querySelector(".title");
    title.innerHTML = `PARROT CARD GAME`;
}

function cards(){
    cardsNumber = parseInt(prompt("Choose how many cards you want, from 4 to 14"));

    while (cardsNumber % 2 !== 0 || cardsNumber < 4 || cardsNumber > 14){
        cardsNumber = parseInt(prompt("You need to indicate a valid number between 4 and 14"));
    }

    createCards();

    const divCards = document.querySelector(".cards");
    for(let i = 0; i < cardsNumber; i++){
        divCards.innerHTML += `
            <div class="card" onclick="clickedCard(this)">
                <div class="front-face face">
                    <img src="./images/front.png">
                </div>
                <div class="back-face face">
                    <img src="./images/${gameCards[i]}">
                </div>
            </div>
        `;

    }

    clockInterval();
}

function random() { 
	return Math.random() - 0.5; 
}

function createCards(){
    originalCards.sort(random);
    for(let i = 0; i < cardsNumber/2; i++){
        gameCards.push(originalCards[i]);
        gameCards.push(originalCards[i]);
    }
    gameCards.sort(random);
}

function clickedCard(cardClicked){
    if(clickedCards.length < 2){
        clickedCards.push(cardClicked);
        cardClicked.classList.add("clicked");
    }
    
    if(clickedCards.length == 2){
        setTimeout(verifyCard, 1000);
    }

    round++;
}

function verifyCard(){
    if(clickedCards[0].innerHTML === clickedCards[1].innerHTML){
        clickedCards[0].classList.add("correct");
        clickedCards[1].classList.add("correct");
        correctCards.push(clickedCards[0]);
        correctCards.push(clickedCards[1]);
        clickedCards.pop();
        clickedCards.pop();
        verifyGame();
        
    } else {
        clickedCards[0].classList.remove("clicked");
        clickedCards[1].classList.remove("clicked");
        clickedCards.pop();
        clickedCards.pop();
    }
}

function verifyGame(){
    if(correctCards.length == cardsNumber){
        alert("You have won with " + round + " moves and in " + time + " seconds!");
        clearInterval(idInterval);
        playAgain();
    }
}

function clock(){
    time++;
    const divClock = document.querySelector(".clock");
    divClock.innerHTML = `${time}`;
}

function playAgain(){
    const playAgain = prompt("Do you want to play again?");

    if(playAgain == "Yes" || playAgain == "yes"){
        resetGame();
        cards();
    }
}

function resetGame(){
    for(let i = 0; i < correctCards.length; i++){
        correctCards[i].classList.remove("correct");
        correctCards[i].classList.remove("clicked");
    }
    cardsNumber = 0;
    correctCards = [];
    clickedCards = [];
    gameCards = [];
    round = 0;
    time = 0;

    const divCards = document.querySelector(".cards");
    divCards.innerHTML = ``;

    const divClock = document.querySelector(".clock");
    divClock.innerHTML = `0`;
}

function clockInterval(){
   idInterval = setInterval(clock, 1000);
}

title();
cards();
