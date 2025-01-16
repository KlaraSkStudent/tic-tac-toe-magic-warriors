"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

// Här skapar vi funktionen som Jesper visade under lektionen, som kan användas för att skriva ut saker till konsolen.
const log = (msg) => console.log(msg);
//if-sats som kontrollerar if game over, hit skickar vi ett 1,2,3 eller 0 värde beroende på utfall
// från checkforgameover
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
  oGameData.gameField = ['O', '', '', '', '', '', '', '', ''];

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
function checkForGameOver() {
  log("Om det här syns har checkForGameOver() startat");

  // Den här funktionen ska returnera 1, 2 eller 3
  // Anropar checkwinner med argumentet playerOne, om vinnare returnera 1
  // Anropar checkwinner med argumentet playerTwo, om vinnare returnera 2
  // Vid ingen vinnare anropas checkForDraw och vid true returnera 3
  // Annars returneras 0 och spelet fortsätter
   
  
  let result;
   
  if(checkWinner(oGameData.playerOne)== true){
    result = 1
    log(result)
  }else if(checkWinner(oGameData.playerTwo) == true){
    result = 2
    log(result)}
  else if (checkForDraw() == true) {
    result = 3
    log(result)}
  else {
    result= 0    
    log(result)
  }
  return result

}

// Skapa en array innehållande alla vinnande kombinationer. Varje vinnande kombiation är själv en array enligt följande [1, 2, 3] där siffrorna representerar en plats i gameField. CHECK
// Skapa en flagga (boolean) för isWinner och sätt den till false. CHECK
// Loopa igenom varje vinnande kombination
// Skapa variablerna a, b, c och tilldela dem värdena i gameField för din nuvarande vinnande kombination.
// Titta sedan om a, b, eller c alla är lika med playerIn, i så fall har vi en vinnare, annars inte.
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej


function checkWinner(playerIn) {
  log("Om det här syns har checkWinner() startat");

  let isWinner = false;

  let winningCombinations = [
    //Vinnande vågräta rader
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vinnande lodräta rader
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Vinnande diagonala rader
    [0, 4, 8],
    [2, 4, 6],
  ];

  //Loopa igenom varje vinnande kombination. Här går vi in i varje array(vinstkombo) i arrayen winningCombinations
  for (const combination of winningCombinations) {
    
    // abc är parametrar som i varje loop byts ut mot en array i arrayen winningCombinations
    //a b c byts ut mot varje array (t ex [0,1,2]) i winningCombinations
    const [a, b, c] = combination;
    log(`Vinstchans: ${combination}`);

    // Om kontrollraden matchar med playerIn ändras variabeln isWinner till true
    // ogameData.gameField[a]=0, [b]=1, [c]=2 om vi utgår från exemplet ovan, här kontrolleras
    // player inputs och rättas mot winningCombinations, vid 3 på rad blir isWinner=true
    // om vi inte hittar 3 på rad så loopar vi igenom nästa array i winningCombinations tills
    // alla möjliga winningCombinations är testade
    // Om ingen vinnande kombination hittas returneras isWinner = false
    if (oGameData.gameField[a] === playerIn &&
            oGameData.gameField[b] === playerIn &&
           oGameData.gameField[c] === playerIn) {
          
       isWinner = true;
      
    }
   
  }
  return isWinner
}




function checkForDraw() {
  log("Om det här syns har checkForDraw() startat");

  //some() kontrollerar om det finns någon tom sträng(ledig plats) i vår testrad.
  //Den här funktionen anropas i checkForGameOver(). Om checkForGameOver får ett truevärde från den här funktionen blir den till en 3:a som i sin tur skickas vidare till checkForGameover
  if (oGameData.gameField.some(cell => cell === "")) {
    return false;
  }

  // Om det inte finns vinnare och inga tomma celler är det oavgjort
  return true;
}


// Nedanstående funktioner väntar vi med!

function prepGame() {}

function validateForm() {}

function initiateGame() {}

function executeMove(event) {}

function changePlayer() {}

function timer() {}

function gameOver(result) {}
