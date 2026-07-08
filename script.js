const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const nextBtn = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");
const quizElement = document.getElementById("quiz");
const questionNumber = document.getElementById("questionNumber");
const resultELement = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answerButtons.innerHTML = "";

  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("option");
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    answerButtons.append(button);

    button.addEventListener("click", function () {
      if (answer.correct) {
        button.classList.add("correct");
        score++;
        scoreElement.textContent = `Score: ${score}`;
      } else {
        button.classList.add("wrong");
      }

      // prevents users from changing their answer.
      const allBtns = answerButtons.children;

      for (let btn of allBtns) {
        if (btn.dataset.correct === "true") {
          btn.classList.add("correct");
        }
        btn.disabled = true;
      }
    });
  });
}

function showScore() {
  quizElement.style.display = "none";

  resultELement.innerHTML = `
     <h2>🎉 Quiz Completed!</h2>
     <p>Your Score: ${score}/${questions.length}</p>
    <button id="restartBtn">Restart Quiz</button>
  `;

  resultELement.style.display = "block";

  document.getElementById("restartBtn").addEventListener("click", startQuiz);
}

nextBtn.addEventListener("click", function () {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function startQuiz() {
  quizElement.style.display = "block";
  resultELement.style.display = "none";
  score = 0;
  currentQuestionIndex = 0;
  scoreElement.textContent = "Score: 0";

  showQuestion();
}

startQuiz();
