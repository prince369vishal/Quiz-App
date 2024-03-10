const questions = [
  {
    question: "Which is the largest animal in the world?",
    answer: [
      { text: "Blue Whale", correct: true },
      { text: "Lion", correct: false },
      { text: "Peacock", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },

  {
    question: "Which is the largest bird in the world?",
    answer: [
      { text: "peacock", correct: true },
      { text: "cock", correct: false },
      { text: "neha", correct: false },
      { text: "Elephant", correct: false },
    ],
  },

  {
    question: "Which is the Smartest Human in the world?",
    answer: [
      { text: "You", correct: false },
      { text: "ME", correct: false },
      { text: "We", correct: false },
      { text: "Vishal", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const nextbtn = document.getElementById("next-btn");

let currentQindex = 0;
let score = 0;

function startQuiz() {
  currentQindex = 0;
  score = 0;
  nextbtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQindex];
  let questionNo = currentQindex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextbtn.style.display = "none";
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextbtn.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextbtn.innerHTML = "Play Again";
  nextbtn.style.display = "block";
}
function handleNextButton() {
  currentQindex++;
  if (currentQindex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextbtn.addEventListener("click", () => {
  if (currentQindex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
