const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hypertext Markup Language", "Hyperloop Machine Language", "Hyperlink and Text Markup Language", "Helicopters Terminals Motorboats Lamborginis"],
    answer: "Hypertext Markup Language"
  }
];

let currentQuestion=0;
let score=0;
let timer;
let timeLeft=15;

const questionEl=document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progressEl = document.getElementById("progress");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const toggleThemeBtn = document.getElementById("toggle-theme");

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
  updateProgress();
  quizBox.classList.remove("hidden");
  resultBox.classList.add("hidden");

}

function showQuestion(){
  resetState();
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  q.options.forEach(option=>{
    const li = document.createElement("li");
    li.textContent = option;
    li.classList.add("slide-option");
    li.addEventListener("click", ()=>selectAnswer(li,q.answer));
    optionsEl.appendChild(li);
  });

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = true;
  resetTimer();



}

function selectAnswer(selectedLi, correctAnswer){
  const options = optionsEl.querySelectorAll("li");
  options.forEach(option => {
    option.classList.add("disabled");
    if(option.textContent === correctAnswer){
      option.classList.add("correct");
    }else if(option ===selectedLi && option.textContent !== correctAnswer){
      option.classList.add("wrong");
    }
    });
  if(selectedLi.textContent === correctAnswer){
    score++;
  }
  selectedLi.classList.add("selected");
  nextBtn.disabled = false;
  stopTimer();
}

function resetState(){
  clearTimeout(timer);
  timeLeft = 15;
  timerEl.textContent = `Time Left: ${timeLeft}sec`;
  optionsEl.innerHTML = "";
}

function resetTimer(){
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = `Time Left: ${timeLeft}sec`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time Left: ${timeLeft}sec`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

function autoSelect(){
  const q=questions[currentQuestion];
  const options = optionsEl.querySelectorAll("li");

  options.forEach(option => {
    if(option.textContent === q.answer){
      option.classList.add("correct");
    }else{
      option.classList.add("wrong");
    }
  });
  nextBtn.disabled = false;
}

function stopTimer(){
  clearInterval(timer);
}

function showResult(){
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `Your Score: ${score}/${questions.length}`;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    updateProgress();
    resetTimer();

  } else {
    stopTimer();
    showResult();
  }
});
prevBtn.addEventListener("click", () => {
  if(currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
    updateProgress();
  }});

  restartBtn.addEventListener("click", () => {
    startQuiz();
  });

  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  function updateProgress() {
    const progressPercent = (currentQuestion / questions.length) * 100;
    progressEl.style.width = `${progressPercent}%`;
  }

  startQuiz();