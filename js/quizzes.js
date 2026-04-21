let currentQuiz = null;
let currentQuestion = 0;
let userAnswers = [];
let score = 0;
let timeLeft = 900;
let timerInterval;
let currentTrack = 'backend';

function initQuiz(quizData, track) {
    currentQuiz = quizData;
    currentTrack = track || 'backend';
    currentQuestion = 0;
    userAnswers = new Array(currentQuiz.length).fill(null);
    score = 0;
    timeLeft = 900;
}

// Start Quiz 
function startQuiz() {
    // Hide ALL screens
    document.querySelectorAll('.quiz-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
// Show quiz screen Only
    const quizScreen = document.getElementById('quizScreen');
    if (quizScreen) {
        quizScreen.classList.add('active');
    }
    
    currentQuestion = 0;
    score = 0;
    timeLeft = 900;
    userAnswers = new Array(currentQuiz.length).fill(null);
    
    startTimer();
    loadQuestion();
}

//Timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = 
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            if (timeLeft <= 120) {
                timerElement.classList.add('urgent');
            }
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

function loadQuestion() {
    if (!currentQuiz || !currentQuiz[currentQuestion]) return;
    
    const question = currentQuiz[currentQuestion];
    
    const questionText = document.getElementById('questionText');
    if (questionText) {
        questionText.textContent = question.question;
    }
    
    const currentQ = document.getElementById('currentQ');
    const totalQ = document.getElementById('totalQ');
    if (currentQ) currentQ.textContent = currentQuestion + 1;
    if (totalQ) totalQ.textContent = currentQuiz.length;
    
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        const progress = ((currentQuestion + 1) / currentQuiz.length) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    const answeredCount = document.getElementById('answeredCount');
    if (answeredCount) {
        const answered = userAnswers.filter(a => a !== null).length;
        answeredCount.textContent = answered;
    }
    
    const answersContainer = document.getElementById('answersContainer');
    if (answersContainer) {
        answersContainer.innerHTML = '';
        
        const letters = ['A', 'B', 'C', 'D'];
        
        question.answers.forEach((answer, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer-option';
            if (userAnswers[currentQuestion] === index) {
                answerDiv.classList.add('selected');
            }
            
            answerDiv.innerHTML = `
                <span class="option-letter">${letters[index]}</span>
                <span>${answer}</span>
            `;
            
            answerDiv.onclick = () => selectAnswer(index);
            answersContainer.appendChild(answerDiv);
        });
    }
    
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.disabled = currentQuestion === 0;
    }
    
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        if (currentQuestion === currentQuiz.length - 1) {
            nextBtn.innerHTML = 'Finish Quiz <i class="fas fa-check"></i>';
            nextBtn.onclick = finishQuiz;
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
            nextBtn.onclick = nextQuestion;
        }
    }
}

// Select Answer
function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    loadQuestion();
}

// Navigation
function nextQuestion() {
    if (currentQuestion < currentQuiz.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

//Finish Quiz 
function finishQuiz() {
    clearInterval(timerInterval);
    
    score = 0;
    currentQuiz.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / currentQuiz.length) * 100);
    
    let level, description, recommendation;
    
    if (percentage >= 70) {
        level = 'Advanced';
        description = 'Great job! You have strong foundations. You can skip some basics and move faster.';
        recommendation = 'Start from intermediate topics. Focus on advanced concepts and projects.';
    } else if (percentage >= 40) {
        level = 'Intermediate';
        description = 'Good! You know the basics but need to strengthen some areas.';
        recommendation = 'Review basic concepts, then move to intermediate topics.';
    } else {
        level = 'Beginner';
        description = 'No worries! Every expert was once a beginner. We\'ll start from the basics.';
        recommendation = 'Start your track from the beginning. We\'ll learn everything step by step.';
    }
    
//HIDE ALL SCREENS
    document.querySelectorAll('.quiz-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
// SHOW RESULTS SCREEN 
    const resultsScreen = document.getElementById('resultsScreen');
    if (resultsScreen) {
        resultsScreen.classList.add('active');
    }
    
// Update result
    animateScore(percentage, 'scorePercentage');
    
    const levelResult = document.getElementById('levelResult');
    const levelDescription = document.getElementById('levelDescription');
    const recommendationText = document.getElementById('recommendationText');
    
    if (levelResult) levelResult.textContent = `${level} Level`;
    if (levelDescription) levelDescription.textContent = description;
    if (recommendationText) recommendationText.textContent = recommendation;
    
    localStorage.setItem('quizLevel', level.toLowerCase());
    localStorage.setItem('quizScore', score);
    localStorage.setItem('quizPercentage', percentage);
    localStorage.setItem('quizTrack', currentTrack);
}

// Score
function animateScore(percentage, elementId) {
    let current = 0;
    const interval = setInterval(() => {
        if (current >= percentage) {
            clearInterval(interval);
        } else {
            current++;
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = `${current}%`;
            }
        }
    }, 20);
}

//Retake 
function retakeQuiz() {
    // Hide ALL screens first
    document.querySelectorAll('.quiz-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) {
        welcomeScreen.classList.add('active');
    }
    currentQuestion = 0;
    userAnswers = new Array(currentQuiz.length).fill(null);
    timeLeft = 900;
    
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = '15:00';
        timerElement.classList.remove('urgent');
    }
}

function getQuizLevel() {
    return localStorage.getItem('quizLevel') || 'beginner';
}
// Quiz Data 
function clearQuizData() {
    localStorage.removeItem('quizLevel');
    localStorage.removeItem('quizScore');
    localStorage.removeItem('quizPercentage');
    localStorage.removeItem('quizTrack');
}