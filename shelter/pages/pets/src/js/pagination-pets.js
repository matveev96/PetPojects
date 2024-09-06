//Slider
const BTN_LEFT_FIRST = document.querySelector("#button-left-first");
const BTN_LEFT = document.querySelector("#button-left");
const BTN_RIGHT = document.querySelector("#button-right");
const BTN_RIGHT_LAST = document.querySelector("#button-right-last");
const SLIDER = document.querySelector(".our-friends__slider");

const SLIDER_WRAPPER = document.querySelector("#slider-wrapper");
const CARDS = document.querySelectorAll(".our-friends__card");

// arrays of slider elements
let sliderArrFir = []; 
let sliderArrSec = [];
let sliderArrThird = [];
let sliderArrFourth = [];
let sliderArrFives = [];
let sliderArrSix = [];
let sliderSum; //sum of arrays

// Add random elements in slider
const arrOfSliderCards = () => {
    for (let i = 0; i < CARDS.length; i++) {
        sliderArrFir.push(`<div class="our-friends__card" data-id="${i}"> ${CARDS[i].innerHTML} </div>`);
        sliderArrSec.push(`<div class="our-friends__card" data-id="${i}"> ${CARDS[i].innerHTML} </div>`);
        sliderArrThird.push(`<div class="our-friends__card" data-id="${i}"> ${CARDS[i].innerHTML} </div>`);
        sliderArrFourth.push(`<div class="our-friends__card" data-id="${i}"> ${CARDS[i].innerHTML} </div>`);
        sliderArrFives.push(`<div class="our-friends__card" data-id="${i}"> ${CARDS[i].innerHTML} </div>`);
        sliderArrSix.push(`<div class="our-friends__card" data-id="${i}"> ${CARDS[i].innerHTML} </div>`);
        CARDS[i].remove();
    };
    SLIDER.remove();
}

const randomCardPack = () => {
    sliderArrFir.sort(() => Math.random() - 0.5).reduce((acc, cur) => acc+cur);
    sliderArrSec.sort(() => Math.random() - 0.5).reduce((acc, cur) => acc+cur);
    sliderArrThird.sort(() => Math.random() - 0.5).reduce((acc, cur) => acc+cur);
    sliderArrFourth.sort(() => Math.random() - 0.5).reduce((acc, cur) => acc+cur);
    sliderArrFives.sort(() => Math.random() - 0.5).reduce((acc, cur) => acc+cur);
    sliderArrSix.sort(() => Math.random() - 0.5).reduce((acc, cur) => acc+cur);
    sliderSum = sliderArrFir.concat(sliderArrSec, sliderArrThird, sliderArrFourth, sliderArrFives, sliderArrSix);
}

const addCardPack = () => {
    let card = document.createElement('div');
    card.className = 'our-friends__new_slider';
    card.innerHTML = sliderSum.reduce((acc, cur) => acc+cur);
    SLIDER_WRAPPER.append(card);
}

arrOfSliderCards();
randomCardPack();
addCardPack();

const NEW_SLIDER = document.querySelector(".our-friends__new_slider");
const NEW_CARDS = document.querySelectorAll(".our-friends__card");

let count; // visible count of cards
let width = 310; // width of card
let width_all_cards;
let num_of_pages;


// Function to update variable values based on window size changes
function updateValues() {
    if (window.innerWidth <= 768) {
        count = 1;
        width_all_cards = -4650;
        num_of_pages = 16;
    } else if (window.innerWidth <= 1200) {
        count = 2;
        width_all_cards = -4340;
        num_of_pages = 8;
    } else {
        count = 4;
        width_all_cards = -6200;
        num_of_pages = 6;
    }
}

// Assign the function to the resize event handler
window.addEventListener('resize', updateValues);

// Call the function immediately to set values when the page loads
updateValues();

let position = 0; // position of slides

function moveNext() {
    // Disable event handlers to prevent multiple clicks
    BTN_LEFT.removeEventListener("click", movePrev);
    BTN_RIGHT.removeEventListener("click", moveNext);
    // Start the animation
    position -= width * count;
    NEW_SLIDER.style.transition = '.7s';
    position = Math.max(position, width_all_cards);
    NEW_SLIDER.style.marginLeft = position + 'px';

    if (position != 0) {
        BTN_LEFT.classList.remove('our-friends__b-p-inactive');
        BTN_LEFT_FIRST.classList.remove('our-friends__b-p-inactive');
    }

    if (position == width_all_cards) {
        BTN_RIGHT.classList.add('our-friends__b-p-inactive');
        BTN_RIGHT_LAST.classList.add('our-friends__b-p-inactive');
    } 
    
    BTN_LEFT.addEventListener("click", movePrev);
    BTN_RIGHT.addEventListener("click", moveNext);
}

function movePrev() {
    // Disable event handlers to prevent multiple clicks
    BTN_LEFT.removeEventListener("click", movePrev);
    BTN_RIGHT.removeEventListener("click", moveNext);

    // Restore the position without animation
    position += width * count;
    NEW_SLIDER.style.transition = '.7s';
    position = Math.min(position, 0);
    NEW_SLIDER.style.marginLeft = position + 'px';
    
    console.log(position)
    if (position == 0) {
        BTN_LEFT.classList.add('our-friends__b-p-inactive');
        BTN_LEFT_FIRST.classList.add('our-friends__b-p-inactive');
        BTN_RIGHT_LAST.classList.remove('our-friends__b-p-inactive');
    };
    if (position != width_all_cards) {
        BTN_RIGHT.classList.remove('our-friends__b-p-inactive');
        BTN_RIGHT_LAST.classList.remove('our-friends__b-p-inactive');
    };

    BTN_LEFT.addEventListener("click", movePrev);
    BTN_RIGHT.addEventListener("click", moveNext);

}

BTN_LEFT.addEventListener("click", movePrev);
BTN_RIGHT.addEventListener("click", moveNext);


function moveLast() {
    // Disable event handlers to prevent multiple clicks
    BTN_LEFT_FIRST.removeEventListener("click", moveFirst);
    BTN_RIGHT_LAST.removeEventListener("click", moveLast);

    position = width_all_cards;

    NEW_SLIDER.style.transition = '.7s';
    NEW_SLIDER.style.marginLeft = position + 'px';
    
    console.log(position)
    if (position == width_all_cards) {
        BTN_RIGHT_LAST.classList.add('our-friends__b-p-inactive');
        BTN_LEFT_FIRST.classList.remove('our-friends__b-p-inactive');
        BTN_LEFT.classList.remove('our-friends__b-p-inactive');
        BTN_RIGHT.classList.add('our-friends__b-p-inactive');
    };
    if (position != width_all_cards) {
        BTN_RIGHT_LAST.classList.remove('our-friends__b-p-inactive');
    };

    BTN_LEFT_FIRST.addEventListener("click", moveFirst);
    BTN_RIGHT_LAST.addEventListener("click", moveLast);
}

function moveFirst() {
    // Disable event handlers to prevent multiple clicks
    BTN_LEFT_FIRST.removeEventListener("click", moveFirst);
    BTN_RIGHT_LAST.removeEventListener("click", moveLast);

    position = 0;

    NEW_SLIDER.style.transition = '.7s';
    NEW_SLIDER.style.marginLeft = position + 'px';
    
    console.log(position)
    if (position == 0) {
        BTN_LEFT_FIRST.classList.add('our-friends__b-p-inactive');
        BTN_LEFT.classList.add('our-friends__b-p-inactive');
        BTN_RIGHT.classList.remove('our-friends__b-p-inactive');
    };
    if (position != width_all_cards) {
        BTN_RIGHT_LAST.classList.remove('our-friends__b-p-inactive');
    };

    BTN_LEFT_FIRST.addEventListener("click", moveFirst);
    BTN_RIGHT_LAST.addEventListener("click", moveLast);

}

BTN_LEFT_FIRST.addEventListener("click", moveFirst);
BTN_RIGHT_LAST.addEventListener("click", moveLast);

const NUM_PAGINATOR = document.querySelector("#num_paginator");

// const numPag = () => {
//     let card = 3;
//     NUM_PAGINATOR.innerHTML = card;
// }

// numPag()

BTN_RIGHT.onclick = function() {
    let countPlus = NUM_PAGINATOR.innerHTML;
    if(+countPlus < num_of_pages){
        NUM_PAGINATOR.innerHTML++;
        NUM_PAGINATOR.innerHTML;
    }
}

BTN_LEFT.onclick = function() {
    let countMinus = NUM_PAGINATOR.innerHTML;
    if(+countMinus >= 2){
        NUM_PAGINATOR.innerHTML--;
        NUM_PAGINATOR.innerHTML;
    }
}

BTN_LEFT_FIRST.onclick = function() {
        NUM_PAGINATOR.innerHTML = 1;
}

BTN_RIGHT_LAST.onclick = function() {
    num_of_pages = num_of_pages;
        NUM_PAGINATOR.innerHTML = num_of_pages;
}

