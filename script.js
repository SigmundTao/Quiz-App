const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');
const mainElm = document.getElementById('main');
const difficultyCards = document.querySelectorAll('.diff-selector');

let questionsRight = 0;
let questionsShown = 0;
let countdown = 60;
let questionsAnswerd = [];
let questionIndex = 0;
let isGameActive = false;

const gameOver = () => {
    isGameActive = false;
    mainElm.innerHTML = `
        <div class="final-score-div">
            <h2>Final Score:</h2>
            <p>${questionsRight}/${questionsShown}</p>
        </div>
        <div class="question-history"></div>
        <button class="play-again-btn">Play Again</button>
    `

    const questionHistory = document.querySelector('.question-history');
    questionsAnswerd.forEach(question => {
        questionHistory.innerHTML += `
            <div class="history-question">
                <div>${question.question}</div>
                <div>
                    <div>
                        <p>Your answer: <span class="answerSpan">${question.userAnswer}</span></p>
                        <p>Correct answer: <span class="answerSpan">${question.correctAnswer}</span></p>
                    </div>
                    <img class="rightOrWrong ${question.correctOrNot}">
                </div>
            </div>
        `
    })
}

const countdownFunc = (countdownLength, countdownDiv) => {
    for(let i = countdownLength; i >= 0; i--){
        setTimeout(() => {
            if(i === 0){
                gameOver();
            }
            countdownDiv.textContent = i;
        }, (countdownLength - i)*1000);
    }
}

const isAnswerCorrect = (userAnswer, correctAnswer, questionType) => {
    if(questionType === 'trueOrFalse'){
        if(userAnswer === correctAnswer){
            return true;
        } else {
            return false;
        }
    } else {
        const splitUserWords = userAnswer.split('');
        let joinedWord = splitUserWords[0];
        for(let i = 1; i < splitUserWords.length; i++){
            joinedWord += splitUserWords[i];
        };
        const splitAnswer = correctAnswer.split('');
        let joinedAnswer = splitAnswer[0];
        for(let j = 1; j < splitUserWords.length; j++){
            joinedWord += splitAnswer[j];
        };
        if(joinedAnswer.toLowerCase() === joinedWord.toLowerCase()){
            return true;
        } else {
            return false;
        }
    }
};


const getNewQuestion = (difficulty, questionHolder, answerSection, questionCounter) => {
    if(!isGameActive){
        return;
    }
    questionCounter.innerHTML = `<p>${questionsRight}/${questionsShown}</p`
    fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}`)
    .then(response => response.json())
    .then(data => {
        const question = data.results[0].question;
        const correctAnswer = data.results[0].correct_answer;
        let questionType = '';

        questionHolder.innerText = question;
        questionCounter.style.display = 'flex';

        if(correctAnswer === true || correctAnswer === false){
            questionType = 'trueOrFalse';
            answerSection.innerHTML = `
                <button class="true-button">True</button>
                <button class="false-button">False</button>
            `;

            const trueAnswerBtn = document.querySelector('.true-button');
            const falseAnswerBtn = document.querySelector('.false-button');

            trueAnswerBtn.addEventListener('click', isAnswerCorrect('true',correctAnswer, 'trueOrFalse'))
            falseAnswerBtn.addEventListener('click', isAnswerCorrect('true',correctAnswer, 'trueOrFalse'))

        } else {
            questionType = 'textQuestion'
            answerSection.innerHTML = `
                <input class="user-input ${difficulty}-secondary">
                <button class="enter-btn">Enter</button>
            `;

            const enterAnswerButton = document.querySelector('.enter-btn');
        };
    })
    .catch(error => {
        const questionInfo = 
        {
            question: 'Failed to load question'
        }
        return questionInfo;
    })
};


const playGame = (diff) => {
    isGameActive = true;
    difficultyCards.forEach(card => card.style.display = 'none');
    const title = diff.charAt(0).toUpperCase() + diff.slice(1);

    mainElm.innerHTML += `
        <div class="countdown-timer">${countdown}</div>
        <div class="question-counter ${diff}-style"></div>
        <div class="question-card ${diff}-style">
            <h2 class="question-difficulty">${title}</h2>
            <div class="question-holder">Start the game already...</div>
            <div class="answer-holder">
                <button class="start-button ${diff}-button">Start</button>
            </div>
        </div>
    `;

    const countdownTimer = document.querySelector('.countdown-timer');
    const questionHolder = document.querySelector('.question-holder');
    const answerHolder = document.querySelector('.answer-holder');
    const questionCounter = document.querySelector('.question-counter');
    const startBtn = document.querySelector('.start-button');
    questionCounter.style.display = 'none';
    startBtn.addEventListener('click', () => getNewQuestion(diff, questionHolder, answerHolder, questionCounter));
    startBtn.addEventListener('click', () => countdownFunc(countdown, countdownTimer));
    
};

hardBtn.addEventListener('click', () => playGame('hard'));
mediumBtn.addEventListener('click', () => playGame('medium'));
easyBtn.addEventListener('click', () => playGame('easy'));


