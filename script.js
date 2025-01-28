"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};
let tdElementRefs = document.querySelectorAll("td");

// Här skapar vi funktionen som Jesper visade under lektionen, som kan användas för att skriva ut saker till konsolen.
const log = (msg) => console.log(msg);
//if-sats som kontrollerar if game over, hit skickar vi ett 1,2,3 eller 0 värde beroende på utfall
// från checkforgameover
window.addEventListener("load", () => {
  initGlobalObject();
  prepGame();
  // if (checkForGameOver() === 1) {
  //   console.log("Spelare 1 vann");
  // } else if (checkForGameOver() === 2) {
  //   console.log("Spelare 2 vann");
  // } else if (checkForGameOver() === 3) {
  //   console.log("Oavgjort");
  // } else {
  //   console.log("Spelet fortsätter");
  // }
});

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {
  log("initGlobalObject()");
  //Datastruktur för vilka platser som är lediga respektive har brickor
  //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner
  oGameData.gameField = ["", "", "", "", "", "", "", "", ""];

  /* Testdata för att testa rättningslösning */
  //oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
  //oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
  //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
  //oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
  // oGameData.gameField = ["X", "O", "X", "0", "X", "O", "O", "X", "O"];

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
  log("checkForGameOver()");
  // log("Om det här syns har checkForGameOver() startat");

  // Den här funktionen ska returnera 1, 2 eller 3
  // Anropar checkwinner med argumentet playerOne, om vinnare returnera 1
  // Anropar checkwinner med argumentet playerTwo, om vinnare returnera 2
  // Vid ingen vinnare anropas checkForDraw och vid true returnera 3
  // Annars returneras 0 och spelet fortsätter

  // let result;

  if (checkWinner(oGameData.playerOne) == true) {
    return 1;
  } else if (checkWinner(oGameData.playerTwo) == true) {
    return 2;
  } else if (checkForDraw() == true) {
    return 3;
  } else {
    // result = 0;
    return 0;
  }
}

// Skapa en array innehållande alla vinnande kombinationer. Varje vinnande kombiation är själv en array enligt följande [1, 2, 3] där siffrorna representerar en plats i gameField. CHECK
// Skapa en flagga (boolean) för isWinner och sätt den till false. CHECK
// Loopa igenom varje vinnande kombination
// Skapa variablerna a, b, c och tilldela dem värdena i gameField för din nuvarande vinnande kombination.
// Titta sedan om a, b, eller c alla är lika med playerIn, i så fall har vi en vinnare, annars inte.
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej

function checkWinner(playerIn) {
  log("checkForGameWinner()");
  // log("Om det här syns har checkWinner() startat");

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
    // log(`Vinstchans: ${combination}`);
    // Om kontrollraden matchar med playerIn ändras variabeln isWinner till true
    // ogameData.gameField[a]=0, [b]=1, [c]=2 om vi utgår från exemplet ovan, här kontrolleras
    // player inputs och rättas mot winningCombinations, vid 3 på rad blir isWinner=true
    // om vi inte hittar 3 på rad så loopar vi igenom nästa array i winningCombinations tills
    // alla möjliga winningCombinations är testade
    // Om ingen vinnande kombination hittas returneras isWinner = false
    if (
      oGameData.gameField[a] === playerIn &&
      oGameData.gameField[b] === playerIn &&
      oGameData.gameField[c] === playerIn
    ) {
      isWinner = true;
      return isWinner;
      // return true;
    }
  }
  // return false;

  return isWinner;
}

function checkForDraw() {
  log("checkForDraw()");
  // log("Om det här syns har checkForDraw() startat");

  //some() kontrollerar om det finns någon tom sträng(ledig plats) i vår testrad.
  //Den här funktionen anropas i checkForGameOver(). Om checkForGameOver får ett truevärde från den här funktionen blir den till en 3:a som i sin tur skickas vidare till checkForGameover
  if (oGameData.gameField.some((cell) => cell === "")) {
    return false;
  }

  // Om det inte finns vinnare och inga tomma celler är det oavgjort
  return true;
}

// Nedanstående funktioner väntar vi med!
let gameAreaRef = document.querySelector("#gameArea");

function prepGame() {
  log("prepGame()");
  let gameAreaRef = document.querySelector("#gameArea");

  gameAreaRef.classList.add("d-none");

  let newGameBtnRef = document.querySelector("#newGame");
  newGameBtnRef.addEventListener("click", () => {
    if (validateForm() === true) {
      initiateGame();
    }
  });
}
function validateForm() {
  console.log(`validateForm()`);
  const playerOneRef = document.querySelector("#nick1");
  const playerTwoRef = document.querySelector("#nick2");
  const playerOneColorRef = document.querySelector("#color1");
  const playerTwoColorRef = document.querySelector("#color2");

  // const errorMessageSpan = document.createElement(`span`);

  try {
    if (playerOneRef.value.length <= 3 || playerOneRef.value.length >= 10) {
      playerOneRef.focus();
      throw new Error(
        "Användarnamnet måste vara mellan tre och tio bokstäver."
      );
    } else if (
      playerTwoRef.value.length <= 3 ||
      playerTwoRef.value.length >= 10
    ) {
      playerTwoRef.focus();
      throw new Error(
        "Användarnamnet måste vara mellan tre och tio bokstäver."
      );
    } else if (
      playerOneColorRef.value === "#ffffff" ||
      playerOneColorRef.value === "#000000"
    ) {
      playerOneColorRef.focus();
      throw new Error("Färgen får inte vara vit eller svart!");
    } else if (
      playerTwoColorRef.value === "#ffffff" ||
      playerTwoColorRef.value === "#000000"
    ) {
      playerTwoColorRef.focus();
      throw new Error("Färgen får inte vara vit eller svart!");
    }
    return true;
  } catch (error) {
    console.log(error.message);
    document.querySelector("#errorMsg").textContent = error.message;
    return false;
  }
}

function initiateGame() {
  log("initiateGame()");

  let theFormRef = document.querySelector(`#theForm`);
  theFormRef.classList.add(`d-none`);

  let gameAreaRef = document.querySelector("#gameArea");
  gameAreaRef.classList.remove("d-none");

  let errorMsgRef = document.querySelector(`#errorMsg`);

  errorMsgRef.textContent = "";

  //tar input från användaren och lagrar användarnamn + färg i en variabel
  let nick1Ref = document.querySelector(`#nick1`);
  let nick1RefValue = nick1Ref.value;

  let color1Ref = document.querySelector(`#color1`);
  let color1RefValue = color1Ref.value;

  oGameData.nickNamePlayerOne = nick1RefValue;

  oGameData.colorPlayerOne = color1RefValue;

  let nick2Ref = document.querySelector(`#nick2`);
  let nick2RefValue = nick2Ref.value;

  let color2Ref = document.querySelector(`#color2`);
  let color2RefValue = color2Ref.value;

  oGameData.nickNamePlayerTwo = nick2RefValue;

  oGameData.colorPlayerTwo = color2RefValue;

  for (let tdElementRef of tdElementRefs) {
    tdElementRef.textContent = "";
    tdElementRef.style.backgroundColor = "#ffffff";
  }

  let playerChar;
  let playerName;

  let randomNumber = Math.random();

  if (randomNumber < 0.5) {
    playerChar = oGameData.playerOne;
    playerName = oGameData.nickNamePlayerOne;
    oGameData.currentPlayer = oGameData.playerOne;
  } else {
    playerChar = oGameData.playerTwo;
    playerName = oGameData.nickNamePlayerTwo;
    oGameData.currentPlayer = oGameData.playerTwo;
  }

  let currentPlayerRef = document.querySelector(".jumbotron>h1");
  currentPlayerRef.textContent = `Aktuell spelare är ${playerName}`;

  gameAreaRef.addEventListener(`click`, executeMove);
}

function executeMove(event) {
  log("executeMove()");

  if (event.target.tagName === "TD" && event.target.textContent === "") {
    let position = event.target.getAttribute("data-id");

    oGameData.gameField[position] = oGameData.currentPlayer;
    event.target.textContent = oGameData.currentPlayer;

    if (oGameData.currentPlayer === "X") {
      event.target.style.backgroundColor = oGameData.colorPlayerOne;
    } else {
      event.target.style.backgroundColor = oGameData.colorPlayerTwo;
    }
    changePlayer();
  }

  function changePlayer() {
    timer(changePlayer);

    log("changePlayer()");
    if (oGameData.currentPlayer === "X") {
      oGameData.currentPlayer = "O";
      document.querySelector(
        ".jumbotron>h1"
      ).textContent = `Aktuell spelare är ${oGameData.nickNamePlayerTwo}`;
    } else {
      oGameData.currentPlayer = "X";
      document.querySelector(
        ".jumbotron>h1"
      ).textContent = `Aktuell spelare är ${oGameData.nickNamePlayerOne}`;
    }

    let isGameOver = checkForGameOver();

    if (isGameOver === 1) {
      gameOver(isGameOver);
    } else if (isGameOver === 2) {
      gameOver(isGameOver);
    } else if (isGameOver === 3) {
      gameOver(isGameOver);
    } else {
    }
  }

  function timer() {
    let countDown = oGameData.seconds;
    // oGameData.timerEnabled = true;

    let timer = setInterval(function () {
      countDown--;
      oGameData.timeRef.textContent = countDown;

      console.log(countDown);

      if (countDown === 0) {
        clearInterval(timer);
        // oGameData.timerEnabled = false;
        // alert(`Tiden är ute`);
        changePlayer();
      }
      // if (!checkForGameOver === 0) {
      // }
    }, 1000);
  }

  // setTimeout(changePlayer, 10000);
  // console.log(oGameData.seconds);
}

function gameOver() {
  document.querySelector("#gameArea").removeEventListener("click", executeMove);

  document.querySelector("#theForm").classList.remove(".d-none");
  document.querySelector("#gameArea").classList.add("d-none");

  let gameWinner = checkForGameOver();
  if (gameWinner === 1) {
    document.querySelector(
      ".jumbotron>h1"
    ).textContent = `Vinnare är ${oGameData.nickNamePlayerOne}! Vill du spela igen?`;
  } else if (gameWinner === 2) {
    document.querySelector(
      ".jumbotron>h1"
    ).textContent = `Vinnare är ${oGameData.nickNamePlayerTwo}! Vill du spela igen?`;
  } else {
    document.querySelector(
      ".jumbotron>h1"
    ).textContent = `Oavgjort! Vill du spel?`;
  }

  initGlobalObject();
}
