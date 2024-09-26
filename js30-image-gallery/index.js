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
const closeBtn = document.querySelector(".close_svg")

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

closeBtn.addEventListener("click", closeInput);
getValueButton.addEventListener("click", searchPush);















