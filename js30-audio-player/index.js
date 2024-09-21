const audioPlayer = document.querySelector('.audio_wrapper');
const btnPlay = document.querySelector('.btn_play');
const btnPrev = document.querySelector('.btn_prev');
const btnNext = document.querySelector('.btn_next');
const imgCover = document.querySelector('.img_cover');
const body = document.querySelector('.body');
const songArtist = document.querySelector('.song_artist');
const songName = document.querySelector('.song_name');
const btnMute = document.querySelector('.btn_mute');
const btnVolume = document.querySelector('.btn_volume');
const timeline = audioPlayer.querySelector(".line");
const volumeline = audioPlayer.querySelector(".volume_line");
const btnRepeat = audioPlayer.querySelector(".btn_repeat");
const btnRepeatOne = audioPlayer.querySelector(".btn_repeat_one");

const audio = new Audio("./assets/audio/beyonce.mp3");

let isPlay = false;
let playNum = 0;

const musicArr = ["./assets/audio/beyonce.mp3", "./assets/audio/dontstartnow.mp3"];
const imgArr = ["./assets/img/lemonade.png", "./assets/img/dontstartnow.png"];
const nameArr = ["Beyonce", "Don't Hurt Yourself", "Dua Lipa", "Don't Start Now"]

const addCover = () => {
    return imgArr[playNum];
}

const nameSong = () => {
    if (playNum == 0) {
        songArtist.textContent = nameArr[playNum];
        songName.textContent = nameArr[playNum + 1];
    } else {
        songArtist.textContent = nameArr[playNum + 1];
        songName.textContent = nameArr[playNum + 2];
    }
}

const playCover = () => {
    imgCover.setAttribute('src', `${addCover()}`);
    body.style.backgroundImage = `url(${addCover()})`;
}

const playAudio = () => {
    if (!isPlay) {
        if (!audio.src) {
            audio.src = musicArr[playNum];
        }
        audio.play();
        isPlay = true;
        imgCover.classList.add("img_cover_scale");
    } else {
        audio.pause();
        isPlay = false;
        imgCover.classList.remove("img_cover_scale");
    }

    toggleBtn();
    nameSong();
};

const toggleBtn = () => {
    if (isPlay) {
        btnPlay.classList.add("btn_pause");
    } else {
        btnPlay.classList.remove("btn_pause");
    }
};

const playNext = () => {
    if (!btnRepeatOne.classList.contains("btn_none")) {
        playNum += 0;
    } else {
        playNum += 1;
        if (playNum >= musicArr.length) {
            playNum = 0;
        }
    }
    isPlay = false;
    audio.src = musicArr[playNum];
    playAudio();
    playCover();
};
audio.addEventListener('ended', playNext);

const playPrev = () => {
    if (!btnRepeatOne.classList.contains("btn_none")) {
        playNum += 0;
    } else {
        playNum -= 1;
        if (playNum < 0) {
            playNum = musicArr.length - 1;
        }
    }
    isPlay = false;
    audio.src = musicArr[playNum];
    playAudio();
    playCover();
};

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
}

setInterval(() => {
    const progressBar = audioPlayer.querySelector(".line_progress");
    const knob = audioPlayer.querySelector(".knob");
    const progressPercentage = (audio.currentTime / audio.duration) * 100;
    
    progressBar.style.width = progressPercentage + "%";
    knob.style.left = `calc(${progressPercentage}% - 10px)`;
    
    audioPlayer.querySelector(".time .time_current").textContent = getTimeCodeFromNum(audio.currentTime);
}, 500);

timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;

  audio.currentTime = timeToSeek;
}, false);

audio.addEventListener(
    "loadeddata",
    () => {
      audioPlayer.querySelector(".time .time_length").textContent = getTimeCodeFromNum(audio.duration);
      audio.volume;
      audioPlayer.querySelector(".volume_progress").style.height = audio.volume * 100 + '%';
    },
    false
);

volumeline.addEventListener("click", e => {
    const volumelineHeight = window.getComputedStyle(volumeline).height;
    const newVolume = e.offsetY / parseInt(volumelineHeight);
    audio.volume = newVolume;
    audioPlayer.querySelector(".volume_progress").style.height = newVolume * 100 + '%';
  }, false
);

const volumeMute = () => {
    if (!audio.muted) {
        audio.muted = true;
        btnMute.classList.remove("btn_none");
        btnVolume.classList.add("btn_none");
        
    } else {
        audio.muted = false;
        audio.volume;
        btnMute.classList.add("btn_none");
        btnVolume.classList.remove("btn_none");
    }
}

const playRepeat = () => {
    playNum -= 0;
    isPlay = false;
    audio.src = musicArr[playNum];
    playAudio();
    playCover();
};

const repeatOne = () => {
    if (!btnRepeat.classList.contains("btn_none")) {
        btnRepeatOne.classList.remove("btn_none");
        btnRepeat.classList.add("btn_none");
    } else {
        btnRepeatOne.classList.add("btn_none");
        btnRepeat.classList.remove("btn_none");
    }
}

btnRepeatOne.addEventListener('click', repeatOne);
btnRepeat.addEventListener('click', repeatOne);
btnPlay.addEventListener('click', playAudio);
btnVolume.addEventListener('click', volumeMute);
btnMute.addEventListener('click', volumeMute);
btnPrev.addEventListener('click', playPrev);
btnNext.addEventListener('click', playNext);