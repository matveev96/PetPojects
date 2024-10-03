const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "./assets/img/bird.png";
bg.src = "./assets/img/flappy_bird_bg.png";
fg.src = "./assets/img/flappy_bird_fg.png";
pipeUp.src = "./assets/img/flappy_bird_pipeUp.png";
pipeBottom.src = "./assets/img/flappy_bird_pipeBottom.png";

let flyAudio = new Audio();
let scoreAudio = new Audio();
let gameAudio = new Audio();
let failAudio = new Audio();
let startGameAudio = new Audio();
let winAudio = new Audio();

startGameAudio.src = "./assets/audio/start-game.mp3";
flyAudio.src = "./assets/audio/fly-button.mp3";
scoreAudio.src = "./assets/audio/score.mp3";
gameAudio.src = "./assets/audio/continue-game.mp3";
failAudio.src = "./assets/audio/fail-kurwa.mp3";
winAudio.src = "./assets/audio/mission-complete.mp3";

document.addEventListener("mousedown", moveUp);
document.addEventListener("keydown", moveUp);
function moveUp() {
  yPos -= 40;
  flyAudio.play();
}

let pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0,
};

let gap = 100;
let xPos = 10;
let yPos = 150;
let grav = 1.3;
let score = 0;
let gameOver = false;
let attempts = 0;

const canvasDiv = document.querySelector(".canvas_div");

const gameOverText = document.createElement("p");
gameOverText.className = "welcome_text";
gameOverText.style.position = "absolute";
gameOverText.style.top = "30%";
gameOverText.style.left = "8%";
gameOverText.style.width = "250px";
gameOverText.style.fontSize = "24px";
gameOverText.style.display = "block";
canvasDiv.appendChild(gameOverText);

const textWelcome = document.createElement("p");
textWelcome.className = "welcome_text";
textWelcome.innerHTML = "Welcome to Flappy Bird!";
textWelcome.style.position = "absolute";
textWelcome.style.top = "5%";
textWelcome.style.left = "5%";
textWelcome.style.width = "250px";
textWelcome.style.fontSize = "24px";
textWelcome.style.display = "block";
canvasDiv.appendChild(textWelcome);

const restartButton = document.createElement("button");
restartButton.className = "start_button";
restartButton.innerHTML = "Start";
restartButton.style.position = "absolute";
restartButton.style.top = "50%";
restartButton.style.left = "50%";
restartButton.style.transform = "translate(-50%, -50%)";
restartButton.style.padding = "10px 20px";
restartButton.style.fontSize = "24px";
restartButton.style.display = "block";
canvasDiv.appendChild(restartButton);

const description = document.createElement("p");
description.className = "description_text";
description.innerHTML = "Score 20 points to Win";
description.style.position = "absolute";
description.style.top = "80%";
description.style.left = "5%";
description.style.width = "260px";
description.style.fontSize = "15px";
description.style.display = "block";
canvasDiv.appendChild(description);

const yourScore = document.createElement("p");
yourScore.className = "your_score";
yourScore.innerHTML = "Last 10 results:";
yourScore.style.position = "absolute";
yourScore.style.top = "45%";
yourScore.style.left = "7%";
yourScore.style.width = "250px";
yourScore.style.display = "block";
canvasDiv.appendChild(yourScore);

const countAttempts = document.createElement("p");
countAttempts.className = "attempts";
countAttempts.style.position = "absolute";
countAttempts.style.top = "60%";
countAttempts.style.left = "7%";
countAttempts.style.width = "260px";
countAttempts.style.display = "block";
canvasDiv.appendChild(countAttempts);

const listScore = document.createElement("div");
listScore.className = "list_score";
listScore.innerHTML = "";
listScore.style.position = "absolute";
listScore.style.top = "52%";
listScore.style.width = "250px";
listScore.style.display = "block";
canvasDiv.appendChild(listScore);

// START GAME
function startGame() {
  startGameAudio.play();
  ctx.drawImage(bg, 0, 0);
  yourScore.style.display = "none";
  gameOverText.style.display = "none";
  timerDiv.style.display = "none";
}
//RESTART GAME
function restartGame() {
  gameOver = false;
  restartButton.style.display = "none";

  pipe = [];
  pipe[0] = { x: cvs.width, y: 0 };
  xPos = 10;
  yPos = 150;
  score = 0;
  grav = 1.3;
  draw();
}
restartButton.addEventListener("click", restartGame);
//ARRAY OF SCORE
let scoreArr = [];
//SCORE CONTROL
function scoreControl(score) {
  let scoreAcc = "";
  let scoreItem = `Score: ${score}`;
  let scoreStyle = "";

  if (score >= 2) {
    scoreStyle = "win_item";
  }

  if (scoreArr.length >= 10) {
    scoreArr = [scoreItem];
    listScore.innerHTML = `<li class="list_item ${scoreStyle}">${scoreArr.length} ${scoreArr[0]}</li>`;
  } else {
    scoreArr.push(scoreItem);
  }

  for (let i = 0; i < scoreArr.length; i++) {
    scoreAcc += `<li class="list_item ${scoreStyle}">${i + 1} ${
      scoreArr[i]
    }</li>`;
    listScore.innerHTML = `${scoreAcc}`;
  }
}


//PLAY ANIMATION
function draw() {
  if (gameOver) {
    return;
  }

  startTimer();

  startGameAudio.pause();
  textWelcome.style.display = "none";
  description.style.display = "none";
  yourScore.style.display = "none";
  listScore.style.display = "none";
  yourScore.style.display = "none";
  gameOverText.style.display = "none";
  timerDiv.style.display = "none";
  countAttempts.style.display = "none";

  gameAudio.play();
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x--;

    if (pipe[i].x == 90) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    if (score >= 2) {
      attempts += 1;
      countAttempts.innerHTML = `Count of attempts: ${attempts.toString()}`;
      countAttempts.style.display = "block";
      ctx.drawImage(bg, 0, 0);
      stopTimer();
      gameAudio.pause();
      gameOver = true;
      winAudio.play();
      restartButton.innerHTML = "Start New Game";
      restartButton.style.display = "block";
      restartButton.style.top = "20%";
      gameOverText.innerHTML = "YOU WIN!";
      gameOverText.style.animation = "MyAnimationBg .2s ease-in-out infinite";
      gameOverText.style.display = "block";
      timerDiv.style.display = "block";
      
      ctx.fillText();
      
    }

    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + bird.height >= cvs.height - fg.height
    ) {
      ctx.drawImage(bg, 0, 0);
      gameAudio.pause();

      gameOver = true;
      restartButton.style.display = "block";
      listScore.style.display = "block";
      yourScore.style.display = "block";
      gameOverText.style.display = "block";
      gameOverText.style.animation = "none";
      restartButton.style.top = "20%";
      timerDiv.style.display = "none";
      countAttempts.style.display = "none";

      failAudio.play();
      gameOverText.innerHTML = "GAME OVER!";

      scoreControl(score);

      restartButton.innerHTML = "Start Again";

      stopTimer();

      attempts += 1;

      return;
    }

    if (pipe[i].x == 5) {
      score++;
      scoreAudio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "16px PressStart2P";
  ctx.fillText("Score: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}
//TIMER
const timerDiv = document.createElement("div");
timerDiv.className = "timer";
timerDiv.style.position = "absolute";
timerDiv.style.top = "55%";
timerDiv.style.left = "5%";
timerDiv.style.width = "260px";
timerDiv.style.display = "block";
canvasDiv.appendChild(timerDiv);

const timerText = document.createElement("span");
timerText.textContent = "Game time: ";
timerText.className = "timer_text";
const timerDots = document.createElement("span");
timerDots.textContent = ":";
timerDots.className = "timer_text";

const minutes = document.createElement("span");
minutes.textContent = "00";
minutes.className = "minutes";
const seconds = document.createElement("span");
seconds.textContent = "00";
seconds.className = "seconds";

timerDiv.append(timerText);
timerDiv.append(minutes);
timerDiv.append(timerDots);
timerDiv.append(seconds);

let timer = 0;
let timerInterval;

function startTimer() {
  stopTimer();
  timerInterval = setInterval(() => {
    timer += 1 / 60;
    let minutesVal = Math.floor(timer / 60);
    let secondsVal = Math.floor(timer) - Math.floor(timer / 60) * 60;
    minutes.innerHTML =
      minutesVal < 10 ? "0" + minutesVal.toString() : minutesVal;
    seconds.innerHTML =
      secondsVal < 10 ? "0" + secondsVal.toString() : secondsVal;
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
}

pipeBottom.onload = startGame;
