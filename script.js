const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const restartBtn = document.getElementById('restartBtn');
const smashSound = document.getElementById('smashSound');
const startBtn = document.getElementById('startBtn');
const timerElement = document.getElementById('timer');

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let antInterval;
let gameTimer;
let timeLeft = 180;  // 3 minutes in seconds
let spawnRate = 1000;
let isGameRunning = false;

highScoreElement.textContent = highScore;

// Function to create a new ant
function spawnAnt() {
  const ant = document.createElement('div');
  ant.classList.add('ant');

  const maxX = gameArea.clientWidth - 50;
  const maxY = gameArea.clientHeight - 50;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  ant.style.left = `${x}px`;
  ant.style.top = `${y}px`;

  // On click - smash
  ant.addEventListener('click', () => {
    smashSound.play();
    ant.remove();
    score++;
    scoreElement.textContent = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      highScoreElement.textContent = highScore;
    }
  });

  gameArea.appendChild(ant);

  // Remove ant after 2 seconds if not clicked
  setTimeout(() => {
    if (gameArea.contains(ant)) {
      ant.remove();
    }
  }, 2000);
}

// Start Game
function startGame() {
  if (isGameRunning) return;

  isGameRunning = true;
  startStopBtn.textContent = 'Stop Game';

  score = 0;
  scoreElement.textContent = score;
  timeLeft = 180;
  spawnRate = 1000;
  gameArea.innerHTML = '';

  // Start timer
  gameTimer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = formatTime(timeLeft);

    // Increase speed every 30 seconds
    if (timeLeft % 30 === 0 && timeLeft !== 180) {
      spawnRate = Math.max(300, spawnRate - 100); // prevent it going below 300ms
      restartAntSpawning();
    }

    // If time's up
    if (timeLeft <= 0) {
      stopGame();
    }
  }, 1000);

  // Start ant spawning
  antInterval = setInterval(spawnAnt, spawnRate);
}

// Stop Game
function stopGame() {
  isGameRunning = false;
  startStopBtn.textContent = 'Start Game';
  clearInterval(gameTimer);
  clearInterval(antInterval);
  alert(`Time's up! Final score: ${score}`);
}

// Restart Ant Spawning with new speed
function restartAntSpawning() {
  clearInterval(antInterval);
  antInterval = setInterval(spawnAnt, spawnRate);
}

// Format time mm:ss
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `Timer :${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Button Listener
startStopBtn.addEventListener('click', () => {
  if (isGameRunning) {
    stopGame();
  } else {
    startGame();
  }
});

// Initialize timer display
timerElement.textContent = formatTime(timeLeft);