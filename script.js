// Define words and hints
const words = [
    { word: "javascript", hint: "A programming language used for web development" },
    { word: "hangman", hint: "A classic word guessing game" },
    // Add more words and hints as needed
  ];
  
  let selectedWord;
  let guessedWord;
  let incorrectGuesses;
  const maxIncorrectGuesses = 6;
  
  const canvas = document.getElementById('hangmanCanvas');
  const ctx = canvas.getContext('2d');
  const hintDisplay = document.getElementById('hint');
  const wordDisplay = document.getElementById('word');
  const messageDisplay = document.getElementById('message');
  const guessInput = document.getElementById('guessInput');
  const guessButton = document.getElementById('guessButton');
  
  function init() {
    // Select a random word
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word.toLowerCase();
    guessedWord = "_".repeat(selectedWord.length);
    incorrectGuesses = 0;
  
    // Display hint
    hintDisplay.textContent = `Hint: ${words[randomIndex].hint}`;
  
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Display word
    displayWord();
  
    // Reset message
    messageDisplay.textContent = '';
  
    // Enable input
    guessInput.disabled = false;
    guessButton.disabled = false;
    guessInput.value = '';
    guessInput.focus();
  }
  
  function displayWord() {
    wordDisplay.textContent = guessedWord.split('').join(' ');
  }
  
  function updateWord(guess) {
    let newGuessedWord = '';
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guess) {
        newGuessedWord += guess;
      } else {
        newGuessedWord += guessedWord[i];
      }
    }
    guessedWord = newGuessedWord;
    displayWord();
  }
  
  function drawHangman() {
    // Draw hangman based on incorrect guesses
    ctx.beginPath();
    switch (incorrectGuesses) {
      case 1: // Head
        ctx.arc(200, 100, 40, 0, Math.PI * 2);
        break;
      case 2: // Body
        ctx.moveTo(200, 140);
        ctx.lineTo(200, 280);
        break;
      case 3: // Left arm
        ctx.moveTo(200, 160);
        ctx.lineTo(150, 200);
        break;
      case 4: // Right arm
        ctx.moveTo(200, 160);
        ctx.lineTo(250, 200);
        break;
      case 5: // Left leg
        ctx.moveTo(200, 280);
        ctx.lineTo(150, 350);
        break;
      case 6: // Right leg
        ctx.moveTo(200, 280);
        ctx.lineTo(250, 350);
        break;
    }
    ctx.stroke();
  }
  
  function checkWin() {
    if (guessedWord === selectedWord) {
      messageDisplay.textContent = 'Congratulations! You guessed the word!';
      guessInput.disabled = true;
      guessButton.disabled = true;
    } else if (incorrectGuesses === maxIncorrectGuesses) {
      messageDisplay.textContent = `Game over! The word was ${selectedWord}`;
      guessInput.disabled = true;
      guessButton.disabled = true;
    }
  }
  
  guessButton.addEventListener('click', function() {
    const guess = guessInput.value.toLowerCase();
    if (guess && guessedWord.indexOf(guess) === -1) {
      if (selectedWord.includes(guess)) {
        updateWord(guess);
      } else {
        incorrectGuesses++;
        drawHangman();
      }
      checkWin();
    }
  });
  
  window.addEventListener('keydown', function(e) {
    const key = e.key.toLowerCase();
    if (/[a-z]/.test(key)) {
      guessInput.value = key;
    }
  });
  
  init();