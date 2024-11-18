const questions = [


  {
    question: "What is the full form of BMW?",
    answer: [
      { text: "Be My Wife", correct: false },
      { text: "Bisleri Mineral Water", correct: false },
      { text: "Bayerische Motoren Werke", correct: true },
      { text: "Tony Kakkar", correct: false },
    ],
  },

  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answer: [
      { text: "Charles Dickens", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Will", correct: false },
      { text: "Prince Vishal", correct: false },
    ],
  },
  {
    question: "Who is the CEO of OPEN AI?",
    answer: [
      { text: "Sam Altman", correct: true },
      { text: "Robert James Chaudhary", correct: false },
      { text: "Neha Kakkar", correct: false },
      { text: "Elon Musk", correct: false },
    ],
  },

  {
    question: "Which is the Smartest Human in the world?",
    answer: [
      { text: "You", correct: false },
      { text: "Giraffe", correct: false },
      { text: "Elon Musk", correct: false },
      { text: "Vishal", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const nextbtn = document.getElementById("next-btn");
const marks = document.getElementById("marks");
const questionLength = document.getElementById("questionLength");

let currentQindex = 0;
let score = 0;

function setupInitailValues() {
  score = 0;
  currentQindex = 0;
  marks.innerHTML= score
  questionLength.innerHTML = questions.length;
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
    marks.innerHTML = score;
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
    setupInitailValues();
  }
});
setupInitailValues();
