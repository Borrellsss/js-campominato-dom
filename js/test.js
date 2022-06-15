// L'utente indica un livello di difficoltà (con un prompt)
// in base al quale decidiamo il range di numeri
// possibili del gioco:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali
// nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito attraverso dei prompt l'utente inserisce un numero
// alla volta finche il gioco non è finito:
// se il numero è presente nella lista dei numeri generati,
// abbiamo calpestato una bomba, il gioco finisce con un messaggio di errore
// Altrimenti il gioco va avanti a meno di aver raggiunto il
// numero massimo di tentativi possibili. In questo caso il
// gioco finisce con un messaggio di vittoria.
// Al termine della partita il software deve comunicare il punteggio,
// cioè il numero di volte che l’utente ha scelto un numero che non era una bomba.

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

// *dichiaro una funzione che determina se un numero è un decimale o meno*
function isFloat(n) {

    return n === +n && n !== (n|0);

}

// *VARIABLES*
let difficultyRangeNumber;

let bombsCounter = 16;

let gameDifficulty;

// *dichiaro un array vuoto in cui slavare il numero di tentativi dell'utente*
const triesArray = [];

// *dichiaro una variabile "flag" che cambierà valore in base al risultato del gioco*
let condition = true;

// *variabile in cui salvo il valore del "return" della funzione "bombsGenerator"*
let bombs;

let userTries;

// *dichiaro una variabile che cambierà in base a se l'utente vince o perde*
let userMessage;

// *dichiaro una variabile a cui attribuirò il punteggio ottenuto dall'utente a fine gioco*
let userScore;

// *LOGIC*
// *inizio un ciclo "while" per far scegliere all'utente la difficoltà del gioco e*
// *controllo che il numero inserito sia un numero cmpreso tra 1 e 3*
while (gameDifficulty < 1 || gameDifficulty > 3 || isNaN(gameDifficulty) || isFloat(gameDifficulty)) {

    gameDifficulty = parseFloat(prompt("Scegli il livello di difficoltà da 1 a 3"));

    // !console.log per rendere più comprensibili i passaggi!
    // console.log(gameDifficulty);

    if (gameDifficulty === 1) {
        difficultyRangeNumber = 100;
        alert("Hai scelto il livello 1!");
        alert("Buona fortuna!");
    } else if (gameDifficulty === 2) {
        difficultyRangeNumber = 81;
        alert("Hai scelto il livello 2!");
        alert("Buona fortuna!");
    } else if (gameDifficulty === 3) {
        difficultyRangeNumber = 49;
        alert("Hai scelto il livello 3! Se è troppo difficile refresha la pagina e scegli un livello di difficoltà inferiore.");
        alert("Buona fortuna!");
    }  else if ((isFloat(gameDifficulty))) {
        alert("Attenzione! Non puoi inserire numeri decimali!");
    } else if (isNaN(gameDifficulty)) {
        alert("Puoi scrivere solo numeri!");
    } else if (gameDifficulty < 1 || gameDifficulty > 3) {
        alert("Numero errato!");
    }
}

// *numero di tentativi possibili per determinare la fine del gioco*
userTries = difficultyRangeNumber - bombsCounter;

// *salvo l'array ottenuto con la funzione "bombsGenerator"*
// *nella variabile "bombs" precedentemente dichiarata*
bombs = bombsGenerator(bombsCounter, difficultyRangeNumber);

// !console.log per rendere più comprensibili i passaggi!
// console.log(bombs);

// *inizio un ciclo "while" con all'interno tutte le condizioni per permettere al gioco di contnuare*
while (condition) {

    // *chiedo all'utente un numero compreso tra 1 e "difficultyRangeNumber"*
    // *e salvo l'input ricevuto in una variabile "userNumber"*
    let userNumber = parseInt(prompt(`inserisci un numero da 1 a ${difficultyRangeNumber}`));

    // *se "userNumber" è presente nell'array slavato nella variabile "bombs"*
    // *allora la variabile "condition" diventerà "false" e il ciclo "while" terminerà*
    // *così come il gioco, dopodichè salverò in "userMessage" e "userScore" il relativo*
    // *risultato e punteggio ottenuto*
    if (bombs.includes(userNumber)) {
        condition = false;
        userMessage = "Hai perso!";
        userScore = `Il tuo punteggio è: ${triesArray.length}`;
    } else {
        
        // *altrimenti se il numero non è presente in "bombs" e tutte le condizioni di validazione sono "false"*
        // *inserisco "userNumber" nell'array "triesArray"*
        if (isNaN(userNumber)) {
            alert("Puoi inserire solo numeri!");
        } else if (userNumber < 1 || userNumber > difficultyRangeNumber) {
            alert(`Attenzione! Non puoi inserire numeri minori di 1 o maggiori di ${difficultyRangeNumber}!`);
        } else if (!triesArray.includes(userNumber) && !bombs.includes(userNumber)) {
            triesArray.push(userNumber);
        } else if (triesArray.includes(userNumber)) {
            alert("Numero già inserito! Riprova!");
        } 
    }

    // *se la lunghezza dell'array "triesArray" corrisponde a "userTries"*
    // *la variabile "condition" diventerà "false" e il ciclo "while" terminerà*
    // *così come il gioco, dopodichè salverò in "userMessage" e "userScore" il relativo*
    // *risultato e punteggio ottenuto*
    if (triesArray.length === userTries) {
        condition = false;
        userMessage = "Congratulazioni! Hai vinto!";
        userScore = `Il tuo punteggio è: ${triesArray.length}!`;
    }
    
    // !console.log per rendere più comprensibili i passaggi!
    // console.log(triesArray);
}

// *stampo in pagina il risultato del gioco*
alert(userMessage);
alert(userScore);