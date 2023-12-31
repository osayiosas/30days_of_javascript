const questions = [
  {
    question: "What is always coming but never arrives? ",

    answers: [
      { text: "Water", correct: false },
      { text: "Tomorrow", correct: true },
      { text: "Rain", correct: false },
      { text: "Yesterday", correct: false },
    ],
  },
  {
    question: "What can be broken but never held?",

    answers: [
      { text: "Food", correct: false },
      { text: "Glass", correct: false },
      { text: "Rain", correct: false },
      { text: "A promise", correct: true },
    ],
  },

  {
    question:
      "What is it that lives if it is fed, and dies if you give it a drink?",

    answers: [
      { text: "Fire", correct: true },
      { text: "Glass", correct: false },
      { text: "Lies", correct: false },
      { text: "Milk", correct: false },
    ],
  },

  {
    question: "What goes up but never ever comes down?",

    answers: [
      { text: "Price", correct: false },
      { text: "Money", correct: false },
      { text: "Your age", correct: true },
      { text: "Words", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answersButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerHTML = answers.text;
    button.classList.add("btn");
    answersButtons.appendChild(button);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", checkAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answersButtons.firstChild) {
    answersButtons.removeChild(answersButtons.firstChild);
  }
}

function checkAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answersButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML =
    "You got " + score + " out of " + questions.length + " questions correct!";
  nextButton.innerHTML = "Play Again"
  nextButton.addEventListener("click", startQuiz);
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length){
    showQuestion();
  } else {
    showScore();
  }
}


nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz;
  }
});
startQuiz();
