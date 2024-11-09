/* 1. Get all the html elements
   2. get values from elements
  3. fetch data from API */

const myForm = document.querySelector(".form__trivia");
const name = document.querySelector(".userName");
const section = document.querySelector(".difficulty__section");
const category = document.querySelector(".category__dropdown");
const difficulty = document.querySelector(".difficulty");
let baseUrl = `https://opentdb.com/api.php?amount=10&type=multiple`;

myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let url = `./pages/test.html`;

  localStorage.clear();
  // Set data in local storage
  localStorage.setItem("category", `${category.value}`);
  localStorage.setItem("difficulty", `${difficulty.value}`);
  localStorage.setItem("name", myForm.name.value); //kaviya
  window.location.href = url;
});
