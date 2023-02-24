'use strict';

const holdButton = document.querySelector(`.btn--hold`);
const rollButton = document.querySelector(`.btn--roll`);
const newButton = document.querySelector(`.btn--new`);
const player_0 = document.querySelector(`.player--0`);
const player_1 = document.querySelector(`.player--1`);
const player = document.querySelector(`.player`);
const current0 = document.querySelector(`#current--0`);
const current1 = document.querySelector(`#current--1`);
const dicePic = document.querySelector(`.dice`);
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player_1.classList.toggle(`player--active`);
  player_0.classList.toggle(`player--active`);
};
dicePic.classList.add(`hidden`);

holdButton.addEventListener(`click`, function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      playing = false;
    }
    switchPlayer();
  }
});

// Roilling dice functionaliy
rollButton.addEventListener(`click`, function () {
  if (playing) {
    // Generating a random dice roll
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    // Display dice
    dicePic.src = `dice-${randomNumber}.png`;
    dicePic.classList.remove(`hidden`);
    // Check for rolled if it is 1 switch to next player
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
newButton.addEventListener(`click`, function () {
  playing = true;
  scores = [0, 0];
  activePlayer = 0;
  dicePic.classList.add(`hidden`);
  document.getElementById(`current--0`).textContent = scores[0];
  document.getElementById(`current--1`).textContent = scores[1];
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  player_0.classList.remove(`player--winner`);
  player_1.classList.remove(`player--winner`);
  player_0.classList.add('player--active');
  player_1.classList.remove('player--active');
});
