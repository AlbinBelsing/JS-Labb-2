"use strict";




//Testutskrifter
/*
console.log( oGameData );
oGameData.initGlobalObject();
console.log( oGameData.gameField );
console.log( oGameData.checkForGameOver() );
*/

/*
console.log( oGameData.checkHorizontal() );
console.log( oGameData.checkVertical() );
console.log( oGameData.checkDiagonalLeftToRight() );
console.log( oGameData.checkDiagonalRightToLeft() );
console.log( oGameData.checkForDraw() );
*/



/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
    oGameData.timerId = null;

}


/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
oGameData.checkForGameOver = function() {
    // Kolla horisontella, vertikala och diagonal vinnande kombinationer
    if (this.checkHorizontal() || this.checkVertical() || this.checkDiagonalLeftToRight() || this.checkDiagonalRightToLeft()) {
        if(this.currentPlayer === this.playerOne){
            return 1;
        } else {
            return 2;
        }
        
    } else if (this.checkForDraw()) {
        return 3; // Oavgjort om det inte finns fler tomma fält
    } else {
        return 0; // Inget avslut ännu
    }
}

/**
 * Kontrollerar horisontella vinnande kombinationer.
 * Returnerar true om det finns en vinnare, annars false.
 * loopen körs så länge i är mindre än 9
 * i kommer att vara 0, 3, 6 när loopen körs.
 */
oGameData.checkHorizontal = function() {
    for (let i = 0; i < 9; i += 3) {
        if (this.gameField[i] !== '' && this.gameField[i] === this.gameField[i + 1] && this.gameField[i + 1] === this.gameField[i + 2]) {
            this.currentPlayer = this.gameField[i];
            return true;
        }
    }
    return false;
}

/**
 * Kontrollerar vertikala vinnande kombinationer.
 * Returnerar true om det finns en vinnare, annars false.
 * loopen körs så länge som i är mindre än 3.
 * värdet på i ökar med 1 efter varje iteration av loopen. i++ är samma sak som i = i + 1.
 */
oGameData.checkVertical = function() {
    for (let i = 0; i < 3; i++) {
        if (this.gameField[i] !== '' && this.gameField[i] === this.gameField[i + 3] && this.gameField[i + 3] === this.gameField[i + 6]) {
            this.currentPlayer = this.gameField[i];
            return true;
        }
    }
    return false;
}

/**
 * Kontrollerar diagonal vinnande kombinationer (från vänster till höger).
 * Returnerar true om det finns en vinnare, annars false.
 */
oGameData.checkDiagonalLeftToRight = function() {
    if (this.gameField[0] !== '' && this.gameField[0] === this.gameField[4] && this.gameField[4] === this.gameField[8]) {
        return true;
    }
    return false;
}

/**
 * Kontrollerar diagonal vinnande kombinationer (från höger till vänster).
 * Returnerar true om det finns en vinnare, annars false.
 */
oGameData.checkDiagonalRightToLeft = function() {
    if (this.gameField[2] !== '' && this.gameField[2] === this.gameField[4] && this.gameField[4] === this.gameField[6]) {
        return true;
    }
    return false;
}

/**
 * Kontrollerar om spelet är oavgjort (inga tomma fält kvar).
 * Returnerar true om spelet är oavgjort, annars false.
 */
oGameData.checkForDraw = function() {
    for (let i = 0; i < this.gameField.length; i++) {
        if (this.gameField[i] === '') {
            return false; // Det finns minst ett tomt fält kvar
        }
    }
    return true; // Alla fält är ifyllda, det är oavgjort
}

/**
 * 
 */

window.addEventListener("load", function(){ //Väntar på att hela HTML sidan laddats innan funktionne körs

oGameData.initGlobalObject(); //Anropar metoden initGlobalObject

let gameArea = document.querySelector("#game-area");
gameArea.classList.add("d-none"); //Lägger till d-none och gömmer game-area

let startKnapp = this.document.querySelector("#newGame"); //När knappen Starta spelet! klickas så anropas funktionen validateform
startKnapp.addEventListener("click", function(){
    console.log("Spelet startar");
    validateForm();

});

});
/**
 * validateForm kontrollerar 
 * om namnen är mer eller lika med 5 tecken
 * om färgerna är olika samt att färgerna inte är svart eller vit
 * är det inga fel så körs initiateGame
 * är det fel så skrivs det ett fel-meddelande ut 
 */
function validateForm(){

    let errorMsg = ""; 

    let playerOne = document.querySelector("#nick1"); //Hämtar värdet för nick1 och nick2 
    let playerTwo = document.querySelector("#nick2");
    let colorPlayerOne =  document.querySelector("#color1"); //Hämtar värdet för color1 och color2
    let colorPlayerTwo =  document.querySelector("#color2");
    
    try {
    //Jag tycker att alla if satser förklarar sig själva men kanske är bäst att ha med kommenterar ändå?
    if(playerOne.length <= 5 || playerTwo.length <= 5){
        errorMsg = ("Namn får inte vara mindre än 5 tecken"); 
    }
    
    if(playerOne === playerTwo){
        errorMsg = ("Namnen får inte vara samma");
    }

    if(colorPlayerOne === "#FFFFFF" || colorPlayerOne === "#000000" || colorPlayerOne === colorPlayerTwo){
        errorMsg = ("Färg får inte vara svart, vit eller samma som andra spelaren");
    }

    if(colorPlayerTwo === "#FFFFFF" || colorPlayerTwo === "#000000" || colorPlayerTwo === colorPlayerOne){
        errorMsg = ("Färg får inte vara svart, vit eller samma som andra spelaren");
    }


    initiateGame();

    } catch (error) {
        let errorMsg = document.querySelector("#errorMsg");
        errorMsg.textContent = errorMsg;
    }
}

function initiateGame() {

    let form = document.querySelector("#div-in-form"); //Gömmer formuläret
    form.classList.add("d-none");

    let gameArea = document.querySelector("#game-area"); //Tar bort d-none och visar spelplanen
    gameArea.classList.remove("d-none");

    let errorMsg = document.querySelector("#errorMsg"); //Osäker vad denna gör, tog den från CHAT-GPT 
    errorMsg.textContent = "";

    oGameData.nickNamePlayerOne = document.querySelector("#nick1").value;
    oGameData.nickNamePlayerTwo = document.querySelector("#nick2").value; //Sparar värdet som skrevs in för namn
    oGameData.colorPlayerOne = document.querySelector("#color1").value; //Sparar värdet som angavs för färg
    oGameData.colorPlayerTwo = document.querySelector("#color2").value;

    let spelPlan = document.querySelectorAll("td"); //Loopar igenom alla "td" i spelplanen och tömmer dom samt sätter bakgrundsfärgen till vit
    for(let i=0; i<spelPlan.length; i++){
        spelPlan[i].textContent = "";
        spelPlan[i].style.backgroundColor = "white"; //Tog denna rad från CHAT-GPT, den ändrar bakgrundsfärgen till vit
    }

    let playerChar; //Lokala variabler inuti initiateGame();
    let playerName;

    let slumpTal = Math.random() //Slumpar ett tal mellan 0 och 1
    if(slumpTal < .5){ //Om det är mindre än 0.5 så tilldelas playerChar till playerOne och playerName till namnet
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
    } else if(slumpTal >= .5){ //Om det är större än eller lika med 0.5 så görs samma som ovan fast för playerTwo
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
    }

    let jumbotron = document.querySelector("jumbotron h1"); //Skriver ut vems tur det är. Ska kanske vara .jumbotron h1 istället för jumbotron h1
    if(oGameData.currentPlayer === oGameData.playerOne) {
        jumbotron = "Aktuell spelare är " + oGameData.nickNamePlayerOne;
    } else {
        jumbotron = "Aktuell spelare är " + oGameData.nickNamePlayerTwo;
    }
}