//get HTML Elemen
let reviewAnswers;
const score = document.querySelector(".display__score");
const reStartBtn = document.querySelector(".restart");
const reviewWrapper = document.querySelector(".display__review--wrapper");

reStartBtn.addEventListener("click", () => {
  localStorage.clear();
  let url = "../index.html";
  window.location.href = url;
});

function load_elements(reviewAnswers) {
  for (let i = 0; i < reviewAnswers.length; i++) {
    const question = document.createElement("h3");
    question.textContent = reviewAnswers[i].question;

    const correctAns = document.createElement("p");
    correctAns.textContent = reviewAnswers[i].correct_answer;

    reviewWrapper.appendChild(question);
    reviewWrapper.appendChild(correctAns);
  }
}

window.onload = () => {
  let bolt_symbol = "";

  const result = localStorage.getItem("score");
  reviewAnswers = JSON.parse(localStorage.getItem("reviewAnswers"));

  for (let i = 0; i < result; i++) {
    bolt_symbol = bolt_symbol + "⚡";
  }

  load_elements(reviewAnswers);

  if (result === 0) {
    score.innerText = ` Did your brain bolt on you today?
    0 ⚡ produced`;
  } else if (result <= 3) {
    score.innerText = `Running low on electrolytes? 
    ${bolt_symbol} 
    ${result}00 Mega Volts today..`;
  } else if (result <= 6) {
    score.innerText = `Brain's back from power outage! Can you feel it buzz? 
    ${bolt_symbol} 
    ${result}00 Mega Voltz`;
  } else if (result <= 9) {
    score.innerText = `Socket frying stuff!!
    ${bolt_symbol} 
    ${result}00 Mega Voltzzz!!`;
  } else {
    score.innerText = `Your brain can power a village!
    ${bolt_symbol} 
    ${result}00 Mega Voltzzz!!`;
  }
};
