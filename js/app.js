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
    // ensure proper flipping of entire card, but not just a side
    if (elementClicked != deck) {
        //if you click on the icon, go up one node to flip the card
        if (elementClicked.classList.contains('fa')) {
            let side = elementClicked.parentNode;
            side.parentNode.classList.toggle('flipped');
            
        } else {
            elementClicked.parentNode.classList.toggle('flipped');
            console.log(elementClicked.parentNode.classList.contains('flipped'));
            
            if (elementClicked.parentNode.classList.contains('flipped')) {
                // console.log(elementClicked.nextElementSibling.innerHTML);
                return elementClicked.nextElementSibling.innerHTML;
            }
        }
    }
}

deck.addEventListener('click', function(e) {
    
    displaySymbol(e.target);
    // addOpenCard(displaySymbol(e.target));
});