/*
 * Create a nodeList that holds all of your cards
 */
let cardsList = document.querySelectorAll('.card');
let cardDeck = document.getElementById('deckOfCards');
let counter = document.getElementById('move-counter');
let moves = 0;
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".close-button");
let starsList = document.querySelector(".stars");
let restart = document.querySelector('.restart');
let modalRestart = document.querySelector('.modal-restart');

counter.textContent = moves;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayRandomCards() {
    /* Creates an array from the cards in the deck and uses a call to shuffle()
     * to randomly arrange the cards
     */
     
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
    /* Randomly reorders the cards in array
     */
     
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}

function startNewGame() {
    /* Randomly rearranges the cards, starts the timer
     */
     
    displayRandomCards(cardsList);
    
    document.querySelector('.timer').innerHTML = '0 min, 0 sec';
    
    let start = timerStart();
	
	function timer() {
	    /* Calculate the time that has passed
	     */
	     
		let now = new Date().getTime();
		let timePassed = now - start;

		let minutes = Math.floor((timePassed % (1000 * 60 * 60))/ (1000 * 60));
		let seconds = Math.floor((timePassed % (1000 * 60))/ 1000);

		document.querySelector('.timer').innerHTML = `${minutes} min, ${seconds} sec`;
	}
    
    let x = setInterval(timer, 1000);
    return x;
}

function timerStop(interId) {
    /* Stops the timer
     */
     
    let stopTime = document.querySelector('.timer').innerHTML;
    clearInterval(interId);
    return stopTime;
}


/*
 * Set up the event listener for a card. If a card is clicked:
 *
 *  - Display the card's symbol (put this functionality in another function that 
 *    you call from this one)
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
 *
 * --------------------------------------Done----------------------------------
 */

let deck = document.body.querySelector('.deck');
let openCards = [];
let lockedCards = [];

function displaySymbol(elementClicked) {
    /* Flips the card over if clicked while symbol is hidden
     */
    
    // make sure you're only flipping a card, nothing else
    // (apparently it's possible to flip the entire game...)
    if (elementClicked.classList.contains('side')) {
        let card = elementClicked.parentNode;
        card.classList.add('flipped');
        let symbol = elementClicked.nextElementSibling.firstElementChild;
        let icon = ('.' + symbol.classList[1]);
        return icon;
    }
}

function timerStart() {
    /* starts the timer
     */
    
    let start = new Date().getTime();
    return start;
}

function addSymbol(icon) {
    /* Adds the recently revealed symbol to openCards to be matched
     */
     
    openCards.push(icon);
    return openCards;
}

function isMatch(list) {
    /* Checks to see if any cards in list are matches
     * Isolate the last card in the list. It is the most recent
     */
    
    let newCard = list.slice(-1)[0];
    // check to see if a similar card has already been revealed
    for (let i in list.slice(0, -1)){
        if (list.slice(0, -1)[i] == newCard) {
            // Select all of the cards with the same symbol on them
            let matchedCards = document.querySelectorAll(newCard);
            // Add class match to indicate they have been matched
            matchedCards.forEach(function(element) {
                element.parentNode.classList.add('match');
                element.parentNode.parentNode.classList.add('flipped-lock');
                lockedCards.push(newCard);
            });
            return lockedCards;
        }
    }
    return false;
}

function notMatch(list) {
    /* Resets openCards to be an empty array and flips the unmatched cards over
     * again iterate through "list" (openCards)
     */
     
    for (let j in list) {
        // look for all cards in the deck with the symbol of this item in openCards
        let hideCards = document.querySelectorAll(list[j]);
        hideCards.forEach(function(el) {
            // flip the card back over
            el.parentNode.parentNode.classList.remove('flipped');
            // clear the list
            openCards = [];
        });
    }
    return openCards;
}

function moveUp(moves) {
    /* Increments the move counter and checks to see if the user has made a
     * certain number of moves. If so, remove a star from their rating.
     */
     
    moves++;
    if (moves == 32) {
        starLess();
    } else if (moves == 50) {
        starLess();
    }
    return moves;
}

function starLess() {
    /* Remove a star from the user's rating
     */
     
    let byeStar = starsList.lastElementChild;
    byeStar.remove();
}

function winner(){
    /* When the user wins, display a congratulations message and the stats,
     * along with a replay button
     */
     
    let stop = timerStop(interId);
    let stars = starsList.innerHTML;
    let modalMessage = `You won!
    
    Your Stats:`;
    let gameStats = `${Math.floor(moves/2)} moves
    ${stop}`;
    modal.querySelector('h1').innerText = modalMessage;
    modal.querySelector('.final-star').innerHTML = stars;
    modal.querySelector('h2').innerText = gameStats;
    modal.classList.toggle("show-modal");
    closeButton.addEventListener("click", function(event) {
        modal.classList.remove('show-modal');
    });
}

deck.addEventListener('click', function(e) {
    /* When the user clicks on a card, reveal the card and if two are revealed,
     * check if they are a match. If not, flip them back over. If so, lock them
     * in the flipped position and add them to a list of matched cards. Once the
     * user has matched all of the cards, tell them they won and tell them how
     * they did
     */
     
    // Prevent matching cards from automatically being revealed on dblclick
    if(e.detail > 1){
         return false;
    } else {
        if (openCards.length < 2 && (!(e.target.classList.contains('deck')))) {
            moves = moveUp(moves);
            counter.textContent = Math.floor(moves/2);
            // Check to make sure the symbol is still hidden. If it is showing, the user
            // should not be able to turn the card back over on their own.
            if (!(e.target.classList.contains('back') || (e.target.parentNode.classList.contains('back')))) {
                let symbol = displaySymbol(e.target);
                let list = (addSymbol(symbol));
                // check the length of the list. If it is two, the openCards need to be matched
                if (list.length == 2) {
                    if (!(isMatch(list))) {
                        // If the last two cards don't match...
                        setTimeout(function() {
                            openCards = notMatch(list);
                        }, 750);
                    } else {
                        openCards = [];
                        if (lockedCards.length == 16) {
                            setTimeout(winner, 750);
                        }
                    }
                }
            }
        }
    }
});

let interId = startNewGame();

function restartGame() {
    /* Rearrange the cards, restart the timer, reset the moves counter, empty
     * the list of matched cards and reset the star rating
     */
     
    lockedCards = [];
	clearInterval(interId);
    timerStop();
    interId = startNewGame();
    moves = 0;
    counter.textContent = moves;
    starsList.innerHTML = 
    `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
    return lockedCards;
}

restart.addEventListener('click', function() {
    /* If the restart button is clicked, restart the game
     */
    
    lockedCards = restartGame();
    return lockedCards;
});

modalRestart.addEventListener('click', function() {
    /* If the user wins the game and decides to play again, restart the game
     */
    
    modal.classList.remove('show-modal');
    lockedCards = restartGame();
    return lockedCards;
});