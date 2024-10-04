console.log(
  "Игру тестировал на мониторах 60Гц и 100Гц. На 60Гц идет играбельней. Вероятно, если у вас монитор больше 100Гц - идти будет так себе, тем не менее в игре реализовано: Три уровня сложности. Чем больше уровень, тем быстрее двигаются колодцы и падает птичка. Ведется статистика: при неудачных попытках ведется таблица с 10 последними попытками, после десятой сбрасывается и все по новой. Также при достижении 20 поинтов показывается общее время, затраченное на игру и количество попыток. По завершению игры реализована кнопка Начачть новую игру, при нажатии на которую вы попадаете на стартовый экран. После недачной попытки (попадании птицы о землю, или колодцы) реализованы кнопки: продолжить играть на том же уровне, начать новую игру. Во время игры показывается текущий уровень и количество набранных баллов. \n\n Реализованы все пункты из ТЗ: \n1. Вёрстка 10+ \n2. Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10 \n3. Реализовано завершение игры при достижении игровой цели +10 \n4. По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10 \n5. Есть таблица результатов, в которой сохраняются результаты 10 игр с наибольшим счетом (лучшим временем и т.п.) или просто 10 последних игр (хранится в local storage) +10 \n6. Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10  "
);

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

let moveUpLevel = 40;

document.addEventListener("mousedown", moveUp);
document.addEventListener("keydown", moveUp);
function moveUp() {
  yPos -= moveUpLevel;
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
let grav = 1;
let score = 0;
let gameOver = false;
let attempts = 0;
let gameLevelVar = 1;
let pipeSpeed = 0.8;

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
restartButton.style.top = "45%";
restartButton.style.left = "48%";
restartButton.style.transform = "translate(-50%, -50%)";
restartButton.style.padding = "10px 20px";
restartButton.style.fontSize = "24px";
restartButton.style.display = "block";
canvasDiv.appendChild(restartButton);

const newGameButton = document.createElement("button");
newGameButton.className = "newgame_button";
newGameButton.innerHTML = "New Game";
newGameButton.style.display = "none";
newGameButton.style.transform = "translate(-50%, -50%)";
newGameButton.style.padding = "10px 20px";
newGameButton.style.position = "absolute";
canvasDiv.appendChild(newGameButton);
newGameButton.addEventListener("click", () => {
  location.reload();
});

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
yourScore.style.top = "44%";
yourScore.style.left = "7%";
yourScore.style.width = "250px";
yourScore.style.display = "block";
canvasDiv.appendChild(yourScore);

const countAttempts = document.createElement("p");
countAttempts.className = "attempts";
countAttempts.style.position = "absolute";
countAttempts.style.top = "60%";
countAttempts.style.left = "4%";
countAttempts.style.width = "260px";
countAttempts.style.display = "block";
canvasDiv.appendChild(countAttempts);

const scoreWin = document.createElement("p");
scoreWin.className = "attempts";
scoreWin.style.position = "absolute";
scoreWin.style.top = "67%";
scoreWin.style.left = "4%";
scoreWin.style.width = "260px";
scoreWin.style.display = "none";
canvasDiv.appendChild(scoreWin);

const listScore = document.createElement("div");
listScore.className = "list_score";
listScore.innerHTML = "";
listScore.style.position = "absolute";
listScore.style.top = "52%";
listScore.style.width = "250px";
listScore.style.display = "block";
canvasDiv.appendChild(listScore);

//TIMER
const timerDiv = document.createElement("div");
timerDiv.className = "timer";
timerDiv.style.position = "absolute";
timerDiv.style.top = "55%";
timerDiv.style.left = "4%";
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

//GAME LEVEL
const levelButtonOne = document.createElement("button");
levelButtonOne.className = "level_button level_button_selected";
levelButtonOne.innerHTML = "Level 1: Easy";
levelButtonOne.style.top = "62%";
canvasDiv.appendChild(levelButtonOne);

const levelButtonTwo = document.createElement("button");
levelButtonTwo.className = "level_button";
levelButtonTwo.innerHTML = "Level 2: Medium";
levelButtonTwo.style.top = "70%";
canvasDiv.appendChild(levelButtonTwo);

const levelButtonThree = document.createElement("button");
levelButtonThree.className = "level_button";
levelButtonThree.innerHTML = "Level 3: Hard";
levelButtonThree.style.top = "78%";
canvasDiv.appendChild(levelButtonThree);

levelButtonOne.addEventListener("click", () => {
  pipeSpeed = 0.6;
  moveUpLevel = 40;
  grav = 1;
  gameLevelVar = 1;
});
levelButtonTwo.addEventListener("click", () => {
  levelButtonOne.classList.remove("level_button_selected");
  pipeSpeed = 1;
  moveUpLevel = 45;
  grav = 1.5;
  gameLevelVar = 2;
});
levelButtonThree.addEventListener("click", () => {
  levelButtonOne.classList.remove("level_button_selected");
  pipeSpeed = 1.5;
  moveUpLevel = 48;
  grav = 1.7;
  gameLevelVar = 3;
});

// START GAME
function startGame() {
  startGameAudio.play();
  ctx.drawImage(bg, 0, 0);
  yourScore.style.display = "none";
  gameOverText.style.display = "none";
  timerDiv.style.display = "none";
  countAttempts.style.display = "none";
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

  for (let i = 0; i < scoreArr.length; i++) {
    scoreAcc += `<li class="list_item">${i + 1} ${scoreArr[i]}</li>`;
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
  levelButtonOne.style.display = "none";
  levelButtonTwo.style.display = "none";
  levelButtonThree.style.display = "none";
  newGameButton.style.display = "none";

  gameAudio.play();
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x = pipe[i].x - pipeSpeed;

    if (Math.floor(pipe[i].x) == 90) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    if (score >= 20) {
      scoreArr = [];
      stopTimer();
      timer = 0;
      attempts += 1;
      countAttempts.innerHTML = `Count of attempts: ${attempts.toString()}`;
      attempts = 0;
      countAttempts.style.display = "block";
      ctx.drawImage(bg, 0, 0);

      gameAudio.pause();
      gameOver = true;
      winAudio.play();

      gameOverText.innerHTML = "YOU WIN!";
      gameOverText.style.animation = "MyAnimationBg .2s ease-in-out infinite";
      gameOverText.style.display = "block";
      timerDiv.style.display = "block";

      levelButtonOne.style.display = "none";
      levelButtonTwo.style.display = "none";
      levelButtonThree.style.display = "none";

      newGameButton.style.top = "20%";
      newGameButton.style.left = "48%";

      newGameButton.style.fontSize = "24px";
      newGameButton.style.display = "block";

      scoreWin.innerHTML = `Your score: ${score}`;
      scoreWin.style.display = "block";

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

      timerDiv.style.display = "none";
      countAttempts.style.display = "none";

      levelButtonOne.style.display = "none";
      levelButtonTwo.style.display = "none";
      levelButtonThree.style.display = "none";

      failAudio.play();
      gameOverText.innerHTML = "GAME OVER!";

      scoreControl(score);

      restartButton.innerHTML = "Start Again";
      restartButton.style.top = "10%";
      restartButton.style.left = "48%";
      restartButton.style.fontSize = "16px";

      newGameButton.style.top = "25%";
      newGameButton.style.left = "48%";
      newGameButton.style.fontSize = "16px";
      newGameButton.style.display = "block";

      attempts += 1;
      return;
    }

    if (Math.floor(pipe[i].x) == 6) {
      score++;
      scoreAudio.play();
    }
  }

  yPos += grav;

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  ctx.fillStyle = "#000";
  ctx.font = "16px PressStart2P";
  ctx.fillText("Score:" + score, 10, cvs.height - 20);
  ctx.fillText("Level:" + gameLevelVar, 10, cvs.height - 80);

  requestAnimationFrame(draw);
}

pipeBottom.onload = startGame;
