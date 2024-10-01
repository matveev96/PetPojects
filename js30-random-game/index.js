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

flyAudio.src = "./assets/audio/fly-button.mp3";
scoreAudio.src = "./assets/audio/score.mp3";
gameAudio.src = "./assets/audio/continue-game.mp3";
failAudio.src = "./assets/audio/fail-kurwa.mp3";

document.addEventListener("keydown", moveUp);
function moveUp() {
    yPos -= 40;
    flyAudio.play();
}

let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0 
}

let gap = 100;
let xPos = 10;
let yPos = 150;
let grav = 1.3;

let score = 0;

function draw() {

    gameAudio.play();
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;

        if(pipe[i].x == 90) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            
            failAudio.play();

            ctx.fillStyle = "#000";
            ctx.font = "24px Verdana";
            ctx.fillText("Game Over", 80, cvs.height / 2);

            location.reload(); // Перезагрузка страницы
        }

        if(pipe[i].x == 5) {
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

pipeBottom.onload = draw;