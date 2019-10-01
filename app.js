// Game values
let min = 1;
let max = 10;
let winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI elements

const game = document.querySelector('.game');
const minNum = document.querySelector('.min');
const maxNum = document.querySelector('.max');
const guessBtn = document.querySelector('.submit-btn');
const guessInput = document.querySelector('.input-field');
const message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again
game.addEventListener('mousedown', e => {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});

guessBtn.addEventListener('click', () => {
  //   e.preventDefault();

  let guess = parseInt(guessInput.value);

  //   Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  //   Check if winning number
  if (guess === winningNum) {
    //game over - won

    gameOver(true, `${winningNum} is correct. YOU WIN!!`);
    //  disable input
    // guessInput.disabled = true;
    // // change border
    // guessInput.style.borderColor = 'green';
    // // Set message
    // setMessage(`${winningNum} is correct. YOU WIN!!`, 'green');
  } else {
    //game over - lost
    //   wrong number
    guessesLeft--;
    if (guessesLeft === 0) {
      gameOver(
        false,
        `Game Over, you lost. The correct answer was ${winningNum}.`
      );
      //  disable input
      //   guessInput.disabled = true;
      //   // change border
      //   guessInput.style.borderColor = 'red';
      //   // Set message
      //   setMessage(
      //     `Game Over, you lost. The correct answer was ${winningNum}.`,
      //     'red'
      //   );
    } else {
      // game continue, answer wrong
      // change border
      guessInput.style.borderColor = 'red';
      // clear input
      guessInput.value = '';
      // tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  //  disable input
  guessInput.disabled = true;
  // change border
  guessInput.style.borderColor = color;
  //   set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  //Play Again?
  guessBtn.value = 'Play Again?';
  guessBtn.classList.add('play-again');
}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
