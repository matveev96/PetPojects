//Slider
const BTN_LEFT = document.querySelector("#button-left");
const BTN_RIGHT = document.querySelector("#button-right");
const CAROUSEL = document.querySelector("#slider-wrapper");
const SLIDER = document.querySelector("#slider");
const CARDS = document.querySelectorAll(".our-friends__card");

let count; // visible count of cards
let width; // width of cards
let position = 0; // position of slides
let sliderArr = []; // array of slider elements 

// Add random elements in slider
for (let i = 0; i < CARDS.length; i++) {
    sliderArr.push(`<div class="our-friends__card" data-id="${i}"> ${CARDS[i].innerHTML} </div>`);
    CARDS[i].remove();
};
sliderArr.sort(() => Math.random() - 0.5);
SLIDER.innerHTML = sliderArr.reduce((acc, cur) => cur + acc);

// Function to update variable values based on window size changes
function updateValues() {
    if (window.innerWidth <= 768) {
        count = 1;
        width = 310;
    } else if (window.innerWidth <= 1200) {
        count = 2;
        width = 310;
    } else {
        count = 3;
        width = 360;
    }
}

// Assign the function to the resize event handler
window.addEventListener('resize', updateValues);

// Call the function immediately to set values when the page loads
updateValues();

function moveNext() {
    // Disable event handlers to prevent multiple clicks
    BTN_LEFT.removeEventListener("click", movePrev);
    BTN_RIGHT.removeEventListener("click", moveNext);
    // Start the animation
    position -= width * count;
    SLIDER.style.transition = '.7s';
    SLIDER.style.marginLeft = position + 'px';
    // After the animation ends
    SLIDER.addEventListener('transitionend', function transitionEnd() {
        SLIDER.style.transition = 'none';
        // Move the first elements to the end
        for (let i = 0; i < count; i++) {
            SLIDER.appendChild(SLIDER.firstElementChild);
        }
        // Restore the position without animation
        position += width * count;
        SLIDER.style.marginLeft = position + 'px';
        // Remove the event listener to avoid multiple triggers 
        SLIDER.removeEventListener('transitionend', transitionEnd);
        // Re-enable event handlers
        BTN_LEFT.addEventListener("click", movePrev);
        BTN_RIGHT.addEventListener("click", moveNext);
    });
}

function movePrev() {
    // Disable event handlers to prevent multiple clicks
    BTN_LEFT.removeEventListener("click", movePrev);
    BTN_RIGHT.removeEventListener("click", moveNext);
    // Move the last elements to the beginning (render before animation)
    for (let i = 0; i < count; i++) {
        SLIDER.insertBefore(SLIDER.lastElementChild, SLIDER.firstElementChild);
    }
    // Restore the position without animation
    position -= width * count;
    SLIDER.style.transition = 'none';
    SLIDER.style.marginLeft = position + 'px';
    // Force browser to update the display
    // (so the browser "notices" the changes before starting the animation)
    void SLIDER.offsetWidth;
    // Start the animation
    position += width * count;
    SLIDER.style.transition = '.7s';
    SLIDER.style.marginLeft = position + 'px';
    // After the animation ends
    SLIDER.addEventListener('transitionend', function transitionEnd() {
        SLIDER.style.transition = 'none';
        // Re-enable event handlers
        BTN_LEFT.addEventListener("click", movePrev);
        BTN_RIGHT.addEventListener("click", moveNext);
        // Remove the event listener to avoid multiple triggers
        SLIDER.removeEventListener('transitionend', transitionEnd);
    });
}

BTN_LEFT.addEventListener("click", movePrev);
BTN_RIGHT.addEventListener("click", moveNext);