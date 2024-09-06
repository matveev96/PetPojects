//Burger menu
const humburger = document.querySelector(".humburger");
const offScreenMenu = document.querySelector(".header__mobile-menu");
const backgroundScreenMenu = document.querySelector(".background_screen");
const body = document.querySelector("body");
const listItems = document.querySelector(".header__list");

humburger.addEventListener("click", () => {
  humburger.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
  backgroundScreenMenu.classList.toggle("active");
  body.classList.toggle("menu-opend");
});

backgroundScreenMenu.addEventListener("click", () => {
    humburger.classList.remove("active");
    offScreenMenu.classList.remove("active");
    backgroundScreenMenu.classList.remove("active");
    body.classList.remove("menu-opend");
});

listItems.addEventListener("click", () => {
    humburger.classList.remove("active");
    offScreenMenu.classList.remove("active");
    backgroundScreenMenu.classList.remove("active");
    body.classList.remove("menu-opend");
});