"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

window.addEventListener("load", () => {
  initGlobalObject();
  if (checkForGameOver() === 1) {
    console.log("Spelare 1 vann");
  } else if (checkForGameOver() === 2) {
    console.log("Spelare 2 vann");
  } else if (checkForGameOver() === 3) {
    console.log("Oavgjort");
  } else {
    console.log("Spelet fortsätter");
  }
});

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {
  //Datastruktur för vilka platser som är lediga respektive har brickor
  //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner
  oGameData.gameField = ["X", "X", "X", "", "", "", "", "", ""];

  /* Testdata för att testa rättningslösning */
  //oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
  //oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
  //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
  //oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
  //oGameData.gameField = ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O'];

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

  //Antalet sekunder för timerfunktionen
  oGameData.seconds = 5;

  //Timerns ID
  oGameData.timerId = null;

  //Från start är timern inaktiverad
  oGameData.timerEnabled = false;

  //Referens till element för felmeddelanden
  oGameData.timeRef = document.querySelector("#errorMsg");
}

/**
 * Kontrollerar för tre i rad genom att anropa funktionen checkWinner() och checkForDraw().
 * Returnerar 0 om spelet skall fortsätta,
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
function checkForGameOver() {}

// Säg till om ni vill få pseudokod för denna funktion
// Skapa en array innehållande alla vinnande kombinationer. Varje vinnande kombiation är själv en array enligt följande [1, 2, 3] där siffrorna representerar en plats i gameField.
// Skapa en flagga (boolean) för isWinner och sätt den till false.
// Loopa igenom varje vinnande kombination
// Skapa variablerna a, b, c och tilldela dem värdena i gameField för din nuvarande vinnande kombination.
// Titta sedan om a, b, eller c alla är lika med playerIn, i så fall har vi en vinnare, annars inte.
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej

function checkWinner(playerIn) {
  let isWinner = false;
  let winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
}
//så länge det är färre än 3 drag för någon av spelarna händer ingenting.
//när någon av spelarna har nått 3 drag kontrolleras spelplanen mot en lista av kolumner, rader & diagonaler
//
//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
  console.log(oGameData.gameField);
}
checkForDraw();

// Nedanstående funktioner väntar vi med!

function prepGame() {}

function validateForm() {}

function initiateGame() {}

function executeMove(event) {}

function changePlayer() {}

function timer() {}

function gameOver(result) {}
