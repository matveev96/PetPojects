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

document.addEventListener("keydown", moveUp);
function moveUp() {
    yPos -= 40;
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

function draw() {
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
            location.reload(); // Перезагрузка страницы
            }
    }

    
    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, xPos, yPos);
    yPos += grav;
    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;