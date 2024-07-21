let score = 0;
let time = 0;
let timerInterval;
let difficulty = 'easy';
const maxNum = { easy: 10, medium: 20, hard: 50 };
const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const submitButton = document.getElementById('submit');
const difficultySelect = document.getElementById('difficulty');
const leaderboardList = document.getElementById('leaderboard-list');

let currentQuestion = generateQuestion();
startTimer();

function generateQuestion() {
    const max = maxNum[difficulty];
    const num1 = Math.floor(Math.random() * max) + 1;
    const num2 = Math.floor(Math.random() * max) + 1;
    const operator = Math.random() > 0.5 ? '+' : '-';
    questionElement.textContent = `${num1} ${operator} ${num2}`;
    return { num1, num2, operator };
}

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        timerElement.textContent = `Time: ${time}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function checkAnswer() {
    const { num1, num2, operator } = currentQuestion;
    let correctAnswer;
    
    if (operator === '+') {
        correctAnswer = num1 + num2;
    } else {
        correctAnswer = num1 - num2;
    }
    
    if (parseInt(answerElement.value) === correctAnswer) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        currentQuestion = generateQuestion();
        answerElement.value = '';
    } else {
        answerElement.value = '';
    }
}

function updateLeaderboard() {
    leaderboard.push({ name: 'Player', score });
    leaderboard.sort((a, b) => b.score - a.score);
    if (leaderboard.length > 5) leaderboard.pop();
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    renderLeaderboard();
}

function renderLeaderboard() {
    leaderboardList.innerHTML = '';
    leaderboard.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.name}: ${entry.score}`;
        leaderboardList.appendChild(li);
    });
}

submitButton.addEventListener('click', () => {
    checkAnswer();
});

answerElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
    currentQuestion = generateQuestion();
});

window.addEventListener('beforeunload', () => {
    updateLeaderboard();
});

renderLeaderboard();
