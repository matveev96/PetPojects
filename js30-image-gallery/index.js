const ACCESS_KEY = '5HMCKZFeD0xgK2zZd_MG9e0tuEJbXoDb1d812S4-Wrc';


async function getPhotos(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&extras=url_m&client_id=${ACCESS_KEY}`;
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

const photoGallary = document.querySelector('.gallary');
const getValueButton = document.querySelector('.search_svg');
const inputElement = document.getElementById('search');
const closeBtn = document.querySelector(".close_svg");
const darkMode = document.querySelector('.dark_mode');
const body = document.getElementById('body');
const logo = document.querySelector('.logo');
const svg = document.querySelector('.svg');

document.addEventListener("DOMContentLoaded", () => {
    inputElement.focus();
    searchPush();
})

function clearGallary() {
    photoGallary.innerHTML = "";
}

const searchPush = () => {
    clearGallary();
    const inputValue = inputElement.value;
    console.log(inputValue);
    let showImg;
    
    if (inputValue) {
        showImg = inputValue;
    } else {
        showImg = "autumn";
    }

    getPhotos(`${showImg}`).then(photos => {
        photos.map(a => {
            const div = document.createElement("div");
            div.classList.add("gallary-img");
            div.style.backgroundImage = `url(${a.urls.small})`;
            
            return div;
        }).forEach(div => photoGallary.append(div));
    });
}

inputElement.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        searchPush();
    }
})

inputElement.addEventListener("input", () => {
    if (inputElement.value !== '') {
        closeBtn.style.opacity = '1';
        closeBtn.style.visibility = 'visible';
    } else {
        closeBtn.style.opacity = '0';
        closeBtn.style.visibility = 'hidden';
    }
})

const closeInput = () => {
    inputElement.value = '';
    closeBtn.style.opacity = '0';
    closeBtn.style.visibility = 'hidden';
}



const darkModeOn = () => {
    if (body.classList.contains('body_light')) {

        body.classList.remove('body_light');
        body.classList.add('body_dark');

        darkMode.innerHTML = "";
        darkMode.innerHTML = `
        <svg class="svg_mode" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="currentColor">
            <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
        </svg>`;
        inputElement.style.backgroundColor = '#424242';
        inputElement.style.color = '#eeeeee';
        logo.style.color = '#e0e0e0';
        svg.style.color = '#eeeeee';
        getValueButton.style.color = '#eeeeee';

    } else {
        body.classList.remove('body_dark');
        body.classList.add('body_light');

        darkMode.innerHTML = "";
        darkMode.innerHTML = `
        <svg class="svg_mode" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="currentColor">
            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
        </svg>`;
        inputElement.style.backgroundColor = '#FFFFFF';
        inputElement.style.color = '#616161';
        logo.style.color = '#424242';
        svg.style.color = '#5f6368'
        getValueButton.style.color = '#5f6368';
    }
}

darkMode.addEventListener("click", darkModeOn);
closeBtn.addEventListener("click", closeInput);
getValueButton.addEventListener("click", searchPush);















