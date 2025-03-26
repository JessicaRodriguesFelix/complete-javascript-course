'use strict';

/* Selecting elements */
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currentScorePlayer0 = document.getElementById('current--0');
const currentScorePlayer1 = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

/* */

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0]; //total scores that accumulates
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //reassigning the player dynamically

  player0El.classList.toggle('player--active'); // toggle method in JavaScript is used to add or remove a class from an HTML element.
  player1El.classList.toggle('player--active');
};

// Rolling dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice on UI
    diceEl.classList.remove('hidden');

    // changes dinamically the images
    diceEl.src = `dice-${dice}.png`;

    //check form rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // currentScorePlayer0.textContent = currentScore; //change later to be for current player
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. add current score to the active player
    scores[activePlayer] += currentScore;
    //   console.log('scores', scores[activePlayer]); //debug
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if score is >=100
    if (scores[activePlayer] >= 10) {
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
