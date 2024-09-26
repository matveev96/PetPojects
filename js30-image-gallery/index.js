
// Ваш API ключ с Unsplash
const ACCESS_KEY = '5HMCKZFeD0xgK2zZd_MG9e0tuEJbXoDb1d812S4-Wrc';

// Функция для получения данных с Unsplash
async function getPhotos(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&extras=url_m&client_id=${ACCESS_KEY}`;
    
    try {
        // Отправляем запрос к API Unsplash
        const response = await fetch(url);

        // Проверяем, был ли успешным запрос
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        // Преобразуем ответ в JSON
        const data = await response.json();
        return data.results; // Возвращаем массив фотографий
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

const photoGallary = document.querySelector('.gallary');
const getValueButton = document.querySelector('.search_svg');
const inputElement = document.getElementById('search');

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

getValueButton.addEventListener("click", searchPush);















