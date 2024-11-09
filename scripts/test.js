//Global variable declartion
let category;
let difficulty;
let dispalyName; //kaviya
let fetchData;
let arrayAns;
let OriginalIncorrectAns;
let currentQuestionIndex = 0;
let score = 0;

//get containers to populate dynamic elements
const questionWrap = document.querySelector(".question_wrap");
const options = document.querySelector(".options");
const nxtBtn = document.querySelector(".form__next--btn");
const username = document.querySelector(".name"); //kaviya

let baseUrl = `https://opentdb.com/api.php?amount=10&type=multiple`;

function validateElements(category, difficulty) {
  if (category != "any") {
    baseUrl += `&category=${category}`;
  }
  if (difficulty != "any") {
    baseUrl = `${baseUrl}&difficulty=${difficulty}`;
  }
}

const fetchTriviaData = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return null;
    });
};

function loadElements() {
  questionWrap.innerHTML = "";
  options.innerHTML = "";
  nxtBtn.disabled = true;
  nxtBtn.classList.add("dissabled");

  let qnNo = currentQuestionIndex + 1;
  let qNo = document.createElement("h3");
  qNo.classList.add("question__number");
  qNo.textContent = `${qnNo}`;
  questionWrap.appendChild(qNo);

  const question = document.createElement("h2");
  question.classList.add("question");
  question.textContent = `${fetchData[currentQuestionIndex].question} `;
  questionWrap.appendChild(question);

  arrayAns = fetchData[currentQuestionIndex].incorrect_answers;
  const randomIndex = Math.floor(Math.random() * (arrayAns.length + 1));

  arrayAns.splice(
    randomIndex,
    0,
    fetchData[currentQuestionIndex].correct_answer
  );

  console.log(arrayAns.length);

  arrayAns.forEach((element, index) => {
    const optionItem = document.createElement("button");
    optionItem.classList.add("options__item");
    optionItem.textContent = element;
    optionItem.addEventListener("click", (event) => {
      event.preventDefault();

      document.querySelectorAll(".options__item").forEach((btn) => {
        btn.disabled = true;
        btn.classList.add("dissabled");
      });
      selectOption(index);
    });
    options.appendChild(optionItem);
  });
}

// Function to handle option selection
function selectOption(selectedOptionIndex) {
  console.log(fetchData[selectedOptionIndex].incorrect_answers);
  console.log(currentQuestionIndex);

  const correctAns = fetchData[currentQuestionIndex].correct_answer;

  const selectedOption =
    fetchData[currentQuestionIndex].incorrect_answers[selectedOptionIndex];

  // If the selected option is correct, increment the score
  if (selectedOption === correctAns) {
    score++;
  }

  // Disable all option buttons after selection
  console.log("score:" + score);

  // Enable the next button
  nxtBtn.disabled = false;
  nxtBtn.classList.remove("dissabled");
}

// Event listener for the Next button
nxtBtn.addEventListener("click", (event) => {
  event.preventDefault();
  currentQuestionIndex++;

  // Check if there are more questions
  if (currentQuestionIndex < fetchData.length) {
    loadElements();
  } else {
    console.log("Yayy!!! test completed!  score :" + score);
    let url = `../pages/score.html`;
    localStorage.clear();
    localStorage.setItem("reviewAnswers", JSON.stringify(fetchData));
    localStorage.setItem("score", score);
    window.location.href = url;
  }
});

window.onload = () => {
  category = localStorage.getItem("category");
  difficulty = localStorage.getItem("difficulty");
  dispalyName = localStorage.getItem("name"); //by kaviya
  username.textContent = `Hi ${dispalyName}, All the best!`;
  validateElements(category, difficulty);
  fetchTriviaData().then((data) => {
    fetchData = data.results; // Use the returned data
    console.log(fetchData);
    loadElements();
  });
};
