document.addEventListener('DOMContentLoaded', function () {
    const startStopButton = document.getElementById('start-stop');
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const endGameElement = document.getElementById('end-game');
    const finalScoreElement = document.getElementById('final-score');
    const restartButton = document.getElementById('restart');
    const leaderboardList = document.getElementById('leaderboard-list');
    const progressBar = document.getElementById('progress-bar').querySelector('span');
    const difficultySelect = document.getElementById('difficulty');

    let score = 0;
    let time = 0;
    let isGameRunning = false;
    let timer;
    let currentQuestion;
    let timeLeft = 30; // 30 seconds for each question

    function getRandomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function generateQuestion() {
        const difficulty = difficultySelect.value;
        let num1, num2;

        if (difficulty === 'easy') {
            num1 = getRandomNumber(10);
            num2 = getRandomNumber(10);
        } else if (difficulty === 'medium') {
            num1 = getRandomNumber(50);
            num2 = getRandomNumber(50);
        } else if (difficulty === 'hard') {
            num1 = getRandomNumber(100);
            num2 = getRandomNumber(100);
        }

        currentQuestion = { num1, num2, answer: num1 + num2 };
        questionElement.textContent = `${num1} + ${num2} = ?`;
        answerInput.value = '';
        answerInput.focus();
    }

    function startGame() {
        score = 0;
        time = 0;
        timeLeft = 30;
        isGameRunning = true;
        startStopButton.textContent = 'Stop';
        endGameElement.classList.add('hidden');
        generateQuestion();
        updateScore();
        updateTimer();
        updateProgressBar();

        timer = setInterval(() => {
            time++;
            timeLeft--;
            updateTimer();
            updateProgressBar();
            
            if (timeLeft <= 0) {
                stopGame();
            }
        }, 1000);
    }

    function stopGame() {
        isGameRunning = false;
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        finalScoreElement.textContent = score;
        endGameElement.classList.remove('hidden');
        updateLeaderboard(score);
    }

    function updateTimer() {
        timerElement.textContent = `Time: ${time}s`;
    }

    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

    function updateProgressBar() {
        const percentage = (timeLeft / 30) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value, 10);
        if (userAnswer === currentQuestion.answer) {
            score++;
            generateQuestion();
            updateScore();
            timeLeft = 30; // Reset time for each correct answer
        } else {
            stopGame();
        }
    }

    function updateLeaderboard(score) {
        const scoreItem = document.createElement('li');
        const timestamp = new Date().toLocaleString();
        scoreItem.textContent = `Score: ${score} - ${timestamp}`;
        leaderboardList.appendChild(scoreItem);
    }

    startStopButton.addEventListener('click', () => {
        if (isGameRunning) {
            stopGame();
        } else {
            startGame();
        }
    });

    submitButton.addEventListener('click', () => {
        if (isGameRunning) {
            checkAnswer();
        }
    });

    answerInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && isGameRunning) {
            checkAnswer();
        }
    });

    restartButton.addEventListener('click', startGame);
});
