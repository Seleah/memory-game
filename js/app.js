/*
 * Create a nodeList that holds all of your cards
 */
let cardsList = document.querySelectorAll('.card');
let cardDeck = document.getElementById('deckOfCards');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayRandomCards() {
    
    let cardsArray = [];
    var tmpElement = document.createElement("div");
    
    for (var i = 0; i < cardsList.length; i++) {
        var card = cardsList[i];
        tmpElement.appendChild(card);
        cardsArray.push(tmpElement.innerHTML);
        tmpElement.innerHTML = '';
    }
    
    cardDeck.innerHTML = shuffle(cardsArray).join('');
    
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

displayRandomCards(cardsList);


/*
 * Set up the event listener for a card. If a card is clicked:
 *
 *  - Display the card's symbol (put this functionality in another function that 
 *    you call from this one) 
  --------------------------------------Done----------------------------------
 *    
 *  - Add the card to a *list* of "open" cards (put this functionality in another
 *    function that you call from this one)
 *    
 *  - If the list already has another card, check to see if the two cards match
 *
 *    + If the cards do match, lock the cards in the open position (put this 
 *      functionality in another function that you call from this one)
 *      
 *    + If the cards do not match, remove the cards from the list and hide the 
 *      card's symbol (put this functionality in another function that you call 
 *      from this one)
 *      
 *    + Increment the move counter and display it on the page (put this 
 *      functionality in another function that you call from this one)
 *      
 *    + If all cards have matched, display a message with the final score 
 *      (put this functionality in another function that you call from this one)
 */

let deck = document.body.querySelector('.deck');
let openCards = []

function displaySymbol(elementClicked) {
    // make sure you're only flipping a card, nothing else
    // (apparently it's possible to flip the entire game...)
    if (elementClicked.classList.contains('side')) {
        let card = elementClicked.parentNode;
        card.classList.add('flipped');
        let symbol = elementClicked.nextElementSibling.firstElementChild;
        let icon = ('.' + symbol.classList[1]);
        // console.log(icon);
        console.log('displaySymbol ran');
        return icon;
    }
}

function addSymbol(icon) {
    openCards.push(icon);
    // console.log(openCards, icon);
    console.log('addSymbol ran');
    return openCards;
}

function isMatch(list) {
    console.log('isMatch:');
    // Isolate the last card in the list. It is the most recent
    let newCard = list.slice(-1)[0];
    console.log('newCard is', newCard);
    // check to see if a similar card has already been revealed
    for (let i in list.slice(0, -1)){
        if (list.slice(0, -1)[i] == newCard) {
            console.log('comparing to', list.slice(0, -1)[i]);
            // Select all of the cards with the same symbol on them
            let matchedCards = document.querySelectorAll(newCard);
            console.log('matchedCards are', matchedCards);
            // Add class match to indicate they have been matched
            matchedCards.forEach(function(element) {
                element.parentNode.classList.add('match');
            });
            return true;
        }
    }
    return false;
}

function notMatch(list) {
    console.log('notMatch called');
    for (let j in list.slice(-2)) {
        let hideCards = document.querySelectorAll(list.slice(-2)[j]);
        hideCards.forEach(function(el) {
            el.parentNode.parentNode.classList.remove('flipped');
        });
    }
}



deck.addEventListener('click', function(e) {
    // Check to make sure the symbol is still hidden. If it is showing, the user
    // should not be able to turn the card back over on their own.
    if (!(e.target.classList.contains('back') || (e.target.parentNode.classList.contains('back')))) {
        let symbol = displaySymbol(e.target);
        let list = (addSymbol(symbol));
        console.log(list, symbol);
        // check the length of the list. If it is even, two are recently revealed
        // and one or more matches are showing
        if (list.length % 2 ==0) {
            console.log(list.length);
            if (!(isMatch(list))) {
                // If the last two cards don't match...
                setTimeout(function() {
                    notMatch(list);
                }, 3000);
            } else {
                // If they do, lock the cards in the flipped position
                
            }
        }
    }
});