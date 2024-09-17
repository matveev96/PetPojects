const btnPlay = document.querySelector('.btn_play');
const btnPause = document.querySelector('.btn_pause')
const audio = new Audio();

function playAudio() {
    audio.src = './assets/audio/beyonce.mp3';
    audio.currentTime = 0;
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

btnPlay.addEventListener('click', playAudio);
btnPause.addEventListener('click', pauseAudio);