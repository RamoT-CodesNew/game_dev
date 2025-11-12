let targetNumber = Math.floor(Math.random()*99) + 1;
let attempts = 0;
const maxAttempts = 7;
let wins = 0;
let losses = 0;

const playerGuess = document.getElementById('playerGuess');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const feedback = document.getElementById('feedback');
const previousGuesses = document.getElementById('previousGuesses');
const attemptsLeftEl = document.getElementById('attemptsLeft');
const winsEl = document.getElementById('wins');
const lossesEl = document.getElementById('losses');

function updateAttemptsLeft(){
  attemptsLeftEl.textContent = Math.max(0, maxAttempts - attempts);
}

function checkGuess(){
  const raw = playerGuess.value.trim();
  const guess = Number(raw);
  if(!raw || Number.isNaN(guess) || guess < 1 || guess > 99){
    feedback.textContent = 'Enter a whole number between 1 and 99.';
    return;
  }
  attempts++;
  previousGuesses.textContent += guess + " ";
  updateAttemptsLeft();

  if(guess === targetNumber){
    feedback.textContent = 'Correct. Number: ' + targetNumber + '. Attempts: ' + attempts + '.';
    wins++;
    winsEl.textContent = wins;
    gameOver();
    return;
  }

  if(attempts >= maxAttempts){
    feedback.textContent = 'You lost. Number was ' + targetNumber + '.';
    losses++;
    lossesEl.textContent = losses;
    gameOver();
    return;
  }

  feedback.textContent = guess < targetNumber ? 'Try a higher number.' : 'Try a lower number.';
  playerGuess.value = '';
  playerGuess.focus();
}

function gameOver(){
  guessBtn.classList.add('hidden');
  resetBtn.classList.remove('hidden');
  playerGuess.disabled = true;
}

function resetGame(){
  attempts = 0;
  targetNumber = Math.floor(Math.random()*99) + 1;
  previousGuesses.textContent = '';
  feedback.textContent = 'New game. Make your guess.';
  playerGuess.value = '';
  playerGuess.disabled = false;
  guessBtn.classList.remove('hidden');
  resetBtn.classList.add('hidden');
  updateAttemptsLeft();
  playerGuess.focus();
}

document.addEventListener('DOMContentLoaded', () => {
  guessBtn.addEventListener('click', checkGuess);
  resetBtn.addEventListener('click', resetGame);
  playerGuess.addEventListener('keydown', (e) => { if(e.key === 'Enter') checkGuess(); });
  resetBtn.classList.add('hidden');
  updateAttemptsLeft();
});
