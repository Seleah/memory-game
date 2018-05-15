/*
 * Create a nodeList that holds all of your cards
 */
let cardsList = document.querySelectorAll('.card');

let cardsArray = []

var tmpElement = document.createElement("div");

for (var i = 0; i < cardsList.length; i++) {
    var card = cardsList[i];
    tmpElement.appendChild(card);
    cardsArray.push(tmpElement.innerHTML);
    tmpElement.innerHTML = '';
}


console.log(cardsArray);







// let cardsArray = [];

// cardsList.forEach(function(card) {
//     console.log(card);
//     console.log(card.typeof);
// });

// for (let i = 0; i < cardsList.length; i++) {
//     cardsArray.push(cardsArray[i].value);
// }

// for (let each in cardsList.values()) {
//     console.log(each);
// }

// var cardsArray = [].concat(cardsList);

// console.log(cardsArray);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards(array) {
    
    let cardDeck = document.getElementById('deckOfCards');
    
    // const fragment = document.createDocumentFragment();  // ← uses a DocumentFragment instead of a <div>

    // for (let i = 0; i < 200; i++) {
    //     const newElement = document.createElement('p');
    //     newElement.innerText = 'This is paragraph number ' + i;
    
    //     fragment.appendChild(newElement);
    // }
    
    cardDeck.innerHTML = shuffle(cardsArray).join('');
    // console.log(cardDeck.innerHTML);
    
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    console.log(array);
    
    return array;
}

displayCards(cardsList);




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */