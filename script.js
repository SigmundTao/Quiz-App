const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');
const mainElm = document.getElementById('main');

const questions = {
    category: {
        1: 'music',
        2: 'sports_and_leisure',
        3: 'film_and_tv',
        4: 'arts_and_literature',
        5: 'history',
        6: 'society_and_culture',
        7: 'science',
        8: 'geography',
        9: 'general_knowledge'
    },
    difficulty: {
        1: 'easy',
        2: 'medium',
        3: 'hard'
    }
};

const easyQuestion = 'https://opentdb.com/api.php?amount=1&difficulty=easy';
const mediumQuestion = 'https://opentdb.com/api.php?amount=1&difficulty=medium';
const hardQuestion = 'https://opentdb.com/api.php?amount=1&difficulty=hard';

const easyGameTest = () => {
    fetch(easyQuestion)
        .then(response => response.json())
        .then(data => {
            const question = data.results[0].question;
            const correctAnswer = data.results[0].correct_answer;
            let questionsCorrect = 0;
            let questionsShown = 1;
            mainElm.innerHTML += `
                <div class="question-counter">${questionsCorrect}/${questionsShown}</div>
                <div class="question-card easy-question">
                    <h2 class="question-difficulty">Easy</h2>
                    <div class="question-holder">${question}</div>
                    <div class="user-input">
                        <input class="user-answer" placeholder="Enter your answer">
                        <button class="question-answer-enter">Enter</button>
                    </div>
                </div>
                `
        })
        .catch(error => {
            mainElm.innerHTML = `<p>Failed to load</p>`
        });

}

easyBtn.addEventListener('click', easyGameTest);


const getNewQuestion = (difficulty) => {
    fetch(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}`)
    .then(response => response.json())
    .then(data => {
        const questionInfo = 
        {
            question: data.results[0].question,
            answer: data.results[0].correct_answer,
        };
        return questionInfo
    })
    .catch(error => {
        const questionInfo = 
        {
            question: 'Failed to load question'
        }
        return questionInfo;
    })
}

const easyGame = () => {
    
}

