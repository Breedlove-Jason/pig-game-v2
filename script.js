// Constants and initial state
const scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let gamePlaying = true;

// DOM elements
const diceDOM = document.querySelector('.dice');
const scoreDOMs = [
  document.getElementById('score--0'),
  document.getElementById('score--1'),
];
const currentDOMs = [
  document.getElementById('current--0'),
  document.getElementById('current--1'),
];
const playerPanels = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];
const playerNames = [
  document.getElementById('name--0'),
  document.getElementById('name--1'),
];

// Initialize the game
function init() {
  scores[0] = 0;
  scores[1] = 0;
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  diceDOM.classList.add('hidden');
  scoreDOMs[0].textContent = '0';
  scoreDOMs[1].textContent = '0';
  currentDOMs[0].textContent = '0';
  currentDOMs[1].textContent = '0';
  playerNames[0].textContent = 'Player 1';
  playerNames[1].textContent = 'Player 2';
  playerPanels[0].classList.remove('player--winner', 'player--active');
  playerPanels[1].classList.remove('player--winner', 'player--active');
  playerPanels[0].classList.add('player--active');
}

// Event listeners
document.querySelector('.btn--roll').addEventListener('click', function() {
  if (gamePlaying) {
    // Generate a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;

    // Display the result
    diceDOM.src = `dice-${dice}.png`;
    diceDOM.classList.remove('hidden');

    // Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      roundScore += dice;
      currentDOMs[activePlayer].textContent = roundScore;
    } else {
      // Switch to the next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI
    scoreDOMs[activePlayer].textContent = scores[activePlayer];

    // Check if the player won the game
    if (scores[activePlayer] >= 100) {
      playerNames[activePlayer].textContent = 'Winner!';
      diceDOM.classList.add('hidden');
      playerPanels[activePlayer].classList.add('player--winner');
      playerPanels[activePlayer].classList.remove('player--active');
      gamePlaying = false;
    } else {
      // Switch to the next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', init);

// Switch to the next player
function nextPlayer() {
  roundScore = 0;
  currentDOMs[activePlayer].textContent = '0';
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerPanels[0].classList.toggle('player--active');
  playerPanels[1].classList.toggle('player--active');
  diceDOM.classList.add('hidden');
}

// Initialize the game on page load
init();
