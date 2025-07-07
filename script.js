const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const restartBtn = document.getElementById('restartBtn');
const smashSound = document.getElementById('smashSound');

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let antInterval;

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
    if (document.body.contains(ant)) {
      ant.remove();
    }
  }, 2000);
}

// Start spawning ants
function startGame() {
  score = 0;
  scoreElement.textContent = score;
  gameArea.innerHTML = '';

  if (antInterval) clearInterval(antInterval);
  antInterval = setInterval(spawnAnt, 1000);
}

// Restart button click
restartBtn.addEventListener('click', startGame);

// Start game on load
startGame();
