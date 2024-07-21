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
    const difficultySelect = document.getElementById('difficulty');
    const leaderboardList = document.getElementById('leaderboard-list');

    let timer;
    let score = 0;
    let time = 0;
    let isGameRunning = false;
    let currentQuestion;
    
    function startGame() {
        isGameRunning = true;
        score = 0;
        time = 0;
        scoreElement.textContent = `Score: ${score}`;
        timerElement.textContent = `Time: ${time}s`;
        endGameElement.classList.add('hidden');
        startStopButton.textContent = 'Stop';
        answerInput.disabled = false;
        answerInput.value = '';
        answerInput.focus();
        generateQuestion();
        timer = setInterval(() => {
            time++;
            timerElement.textContent = `Time: ${time}s`;
        }, 1000);
    }
    
    function stopGame() {
        isGameRunning = false;
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        endGameElement.classList.remove('hidden');
        finalScoreElement.textContent = score;
        answerInput.disabled = true;
        updateLeaderboard(score);
    }
    
    function generateQuestion() {
        const difficulty = difficultySelect.value;
        let num1, num2;
        switch (difficulty) {
            case 'easy':
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                break;
            case 'medium':
                num1 = Math.floor(Math.random() * 50) + 1;
                num2 = Math.floor(Math.random() * 50) + 1;
                break;
            case 'hard':
                num1 = Math.floor(Math.random() * 100) + 1;
                num2 = Math.floor(Math.random() * 100) + 1;
                break;
        }
        currentQuestion = {
            num1: num1,
            num2: num2,
            answer: num1 + num2
        };
        questionElement.textContent = `${num1} + ${num2}`;
    }
    
    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        if (userAnswer === currentQuestion.answer) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            answerInput.value = '';
            generateQuestion();
        } else {
            stopGame();
        }
    }
    
    function updateLeaderboard(score) {
        const listItem = document.createElement('li');
        listItem.textContent = `Score: ${score}`;
        leaderboardList.appendChild(listItem);
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
