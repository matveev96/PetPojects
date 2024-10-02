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

const canvasDiv = document.querySelector(".canvas_div");

const restartButton = document.createElement("button");
restartButton.className = "start_button";
restartButton.innerHTML = "Start";
restartButton.style.position = "absolute";
restartButton.style.top = "20%";
restartButton.style.left = "50%";
restartButton.style.transform = "translate(-50%, -50%)";
restartButton.style.padding = "10px 20px";
restartButton.style.fontSize = "24px";
restartButton.style.display = "block";
canvasDiv.appendChild(restartButton);

const gameOverText = document.createElement("p");
gameOverText.className = "welcome_text";
gameOverText.style.position = "absolute";
gameOverText.style.top = "25%";
gameOverText.style.left = "8%";
gameOverText.style.width = "250px";
gameOverText.style.fontSize = "24px";
gameOverText.style.display = "block";
canvasDiv.appendChild(gameOverText);

const textWelcome = document.createElement("p");
textWelcome.className = "welcome_text";
textWelcome.innerHTML = "Welcome to Flappy Bird!";
textWelcome.style.position = "absolute";
textWelcome.style.top = "25%";
textWelcome.style.left = "5%";
textWelcome.style.width = "250px";
textWelcome.style.fontSize = "24px";
textWelcome.style.display = "block";
canvasDiv.appendChild(textWelcome);

const description = document.createElement("p");
description.className = "description_text";
description.innerHTML = "Your goal is 100 points. Press Start and enjoy your fly :)";
description.style.position = "absolute";
description.style.top = "72%";
description.style.left = "5%";
description.style.width = "250px";
description.style.fontSize = "15px";
description.style.display = "block";
canvasDiv.appendChild(description);

const yourScore = document.createElement("p");
yourScore.className = "your_score";
yourScore.innerHTML = "Last 10 results:";
yourScore.style.position = "absolute";
yourScore.style.top = "40%";
yourScore.style.left = "7%";
yourScore.style.width = "250px";
yourScore.style.display = "block";
canvasDiv.appendChild(yourScore);

const listScore = document.createElement("div");
listScore.className = "list_score";
listScore.innerHTML = "";
listScore.style.position = "absolute";
listScore.style.top = "48%";
listScore.style.width = "250px";
listScore.style.display = "block";
canvasDiv.appendChild(listScore);

// START GAME
function startGame() {
  startGameAudio.play();
  ctx.drawImage(bg, 0, 0);
  yourScore.style.display = "none";
  gameOverText.style.display = "none";
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
  if (scoreArr.length >= 10) {
    scoreArr = [scoreItem];
    listScore.innerHTML = `<li class="list_item">${scoreArr.length} ${scoreArr[0]}</li>`;
  } else {
    scoreArr.push(scoreItem);
  }

  for(let i = 0; i < scoreArr.length; i++) {
    scoreAcc += `<li class="list_item">${i + 1} ${scoreArr[i]}</li>`
    listScore.innerHTML = `${scoreAcc}`;
  }
}
//PLAY ANIMATION
function draw() {
  if (gameOver) {
    return;
  }

  startGameAudio.pause();
  textWelcome.style.display = "none";
  description.style.display = "none";
  yourScore.style.display = "none";
  listScore.style.display = "none";
  yourScore.style.display = "none";
  gameOverText.style.display = "none";

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
      
      scoreControl(score);

      if(score >= 2) {
        winAudio.play();
        gameOverText.innerHTML = "YOU WIN!";
      } else {
        failAudio.play();
        gameOverText.innerHTML = "GAME OVER!";
      }

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
  ctx.font = "24px Verdana";
  ctx.fillText("Score: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

pipeBottom.onload = startGame;
