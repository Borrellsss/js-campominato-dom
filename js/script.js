// L'utente indica un livello di difficoltà in base al quale
// viene generata una griglia di gioco quadrata,
// in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso
// range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente
// nella lista dei numeri generati - abbiamo calpestato una bomba -
// la cella si colora di rosso e la partita termina, altrimenti la cella
// cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge
// il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio,
// cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste

// *FUNCTION*
// *dichiaro una funzione che genera 16 numeri randomici e li inserisce in un array*
// *una volta generati ritorno l'array che ne risulta*
function bombsGenerator (bombs, maxValue) {

    let randomNumber;

    const bombsArray = [];

    while (bombsArray.length < bombs) {

        randomNumber = getRndInteger(1, maxValue);
        
        if (!bombsArray.includes(randomNumber)) {
            bombsArray.push(randomNumber);
        }
    }

    return bombsArray;
}

function getRndInteger (min, max) {

    return Math.floor(Math.random() * (max - min + 1) ) + min;

}

// *VARIABLES*
let difficultyRangeNumber;

let bombsCounter = 16;

let gameDifficulty;

let userCell;

// *variabile in cui salvo il valore del "return" della funzione "bombsGenerator"*
let bombs;

let userTries;

// *dichiaro una variabile che cambierà in base a se l'utente vince o perde*
let userMessage;

// *dichiaro una variabile a cui attribuirò il punteggio ottenuto dall'utente a fine gioco*
let userScore;

// *salvo in una variabile l'elemento "button" del DOM*
const startBtn = document.getElementById("start-btn");

// *salvo in una variabile l"elemento "div.box-wrapper" del DOM*
const boxWrapper = document.querySelector(".box-wrapper");

// *salvo in una variabile il div nel quale stamperò il risultato del gioco al termine dello stesso*
const divUserMessage = document.querySelector(".user-message");

// *dichiaro una variabile a cui assegnerò un valore diverso (ovvero una "classe") che poi*
// *aggiungerò all'elemento "div.box-wrapper" in base alla difficoltà selezionata dall'utente*
let boxWrapperNewClass;

let smallBox;

// *LOGIC*
startBtn.addEventListener("click", startGame);

function startGame () {
    
    // *salvo in "gameDifficulty" la "value" dell'elemento "select" del DOM*
    gameDifficulty = parseInt(document.getElementById("difficulty").value);

    boxWrapper.innerHTML = "";

    boxWrapper.classList.remove(boxWrapperNewClass);

    divUserMessage.innerHTML = "";

    boxWrapper.style.pointerEvents = "auto";

    // *dichiaro un array vuoto in cui slavare il numero di tentativi dell'utente*
    const triesArray = [];

    // !console.log per rendere più comprensibili i passaggi!
    console.log(gameDifficulty);

    if (gameDifficulty === 1) {
        difficultyRangeNumber = 100;
        boxWrapperNewClass = "easy"
        alert("Hai scelto il livello 1!");
        alert("Buona fortuna!");
    } else if (gameDifficulty === 2) {
        difficultyRangeNumber = 81;
        boxWrapperNewClass = "normal"
        alert("Hai scelto il livello 2!");
        alert("Buona fortuna!");
    } else if (gameDifficulty === 3) {
        difficultyRangeNumber = 49;
        boxWrapperNewClass = "hard"
        alert("Hai scelto il livello 3! Se è troppo difficile scegli un livello di difficoltà inferiore.");
        alert("Buona fortuna!");
    }

    // *aggiungo la classe "easy", "normal" o "hard" salvata nella variabile "boxWrapperNewClass"*
    // *che cambierà in base alla scelta dell'utente*
    boxWrapper.classList.add(boxWrapperNewClass);

    // !console.log per rendere più comprensibili i passaggi!
    console.log(difficultyRangeNumber);
    console.log(boxWrapperNewClass);

    // *numero di tentativi possibili per determinare la fine del gioco*
    userTries = difficultyRangeNumber - bombsCounter;

    // *salvo l'array ottenuto con la funzione "bombsGenerator"*
    // *nella variabile "bombs" precedentemente dichiarata*
    bombs = bombsGenerator(bombsCounter, difficultyRangeNumber);

    // !console.log per rendere più comprensibili i passaggi!
    console.log(bombs);

    for (let i = 1; i <= difficultyRangeNumber; i++) {
        smallBox = document.createElement("div");
        smallBox.classList.add("small-box");
        smallBox.innerHTML = `<span>${i}</span>`;
        boxWrapper.append(smallBox);

        smallBox.addEventListener("click", gameCell);
    }

    function gameCell () {

        userCell = parseInt(this.querySelector("span").innerHTML);

        // !console.log per rendere più comprensibili i passaggi!
        console.log(userCell);

        // *se "userCell" è presente nell'array slavato nella variabile "bombs"*
        // *l'utente ha perso e il gioco termina*
        // *dopodichè partirà un alert con un messaggio "hai perso!"*
        // *e stampo in pagina il punteggio ottenuto*
        if (bombs.includes(userCell)) {
            this.classList.add("bomb");
            alert("Hai perso!");
            divUserMessage.innerHTML = `Il tuo punteggio è: ${triesArray.length}!`;
            boxWrapper.style.pointerEvents = "none";
        } else {
            // *altrimenti se "userCell" non è presente in "bombs" e tutte le condizioni di validazione sono "false"*
            // *inserisco "userCell" nell'array "triesArray"*
            if (!triesArray.includes(userCell)) {
                triesArray.push(userCell);
                this.classList.add("free");
            } else if (triesArray.includes(userCell)) {
                alert("cella già cliccata! Riprova!");
            } 
        }


        // *se la lunghezza dell'array "triesArray" corrisponde a "userTries"*
        // *l'utente ha vinto e il gioco termina*
        // *dopodichè partirà un alert con un messaggio "hai vinto!"*
        // *e stampo in pagina il punteggio ottenuto*
        if (triesArray.length === 2) {
            alert("Congratulazioni! Hai vinto!");
            divUserMessage.innerHTML = `Il tuo punteggio è: ${triesArray.length}!`;
            boxWrapper.style.pointerEvents = "none";
        }
        
        // !console.log per rendere più comprensibili i passaggi!
        console.log(triesArray);
    }
    
}
