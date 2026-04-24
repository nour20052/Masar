let currentQuiz = null;
let currentQuestion = 0;
let userAnswers = [];
let score = 0;
let timeLeft = 900;
let timerInterval;
let currentSkill = '';
let attemptCount = 0;
let startTime = null;

function getSkillFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('skill') || 'programming-basics';
}

function loadQuizData(skill) {
    const script = document.createElement('script');
    script.src = `../js/quiz/quiz-${skill}-data.js`;
    script.onerror = () => {
        alert('Quiz data not found!');
        window.location.href = '../Roadmap/roadmap.html';
    };
    document.body.appendChild(script);
}

function initSkillQuiz(quizData, skill) {
    currentQuiz = quizData;
    currentSkill = skill;
    currentQuestion = 0;
    userAnswers = new Array(currentQuiz.length).fill(null);
    score = 0;
    timeLeft = 900;
    startTime = Date.now();
    
    const attempts = localStorage.getItem(`quiz_attempts_${skill}`);
    attemptCount = attempts ? parseInt(attempts) : 0;
    
    updateSidebar(skill);
    loadQuestion();
    startTimer();
}

function updateSidebar(skill) {
    const skillName = document.getElementById('skillName');
    const questionCount = document.getElementById('questionCount');
    
    if (skillName) {
        skillName.textContent = skill.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    if (questionCount && currentQuiz) {
        questionCount.textContent = currentQuiz.length;
    }
}

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
    
    updateQuestionNumbers();
    
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
            nextBtn.className = 'btn-finish';
            nextBtn.onclick = finishQuiz;
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
            nextBtn.className = 'btn-next';
            nextBtn.onclick = nextQuestion;
        }
    }
}

function updateQuestionNumbers() {
    const numbersContainer = document.getElementById('questionNumbers');
    if (!numbersContainer) return;
    
    numbersContainer.innerHTML = '';
    
    for (let i = 0; i < currentQuiz.length; i++) {
        const numDiv = document.createElement('div');
        numDiv.className = 'question-number';
        numDiv.textContent = i + 1;
        
        if (i === currentQuestion) {
            numDiv.classList.add('active');
        }
        
        if (userAnswers[i] !== null) {
            numDiv.classList.add('answered');
        }
        
        numDiv.onclick = () => goToQuestion(i);
        numbersContainer.appendChild(numDiv);
    }
}

function goToQuestion(index) {
    currentQuestion = index;
    loadQuestion();
}

function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    loadQuestion();
}

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

function finishQuiz() {
    clearInterval(timerInterval);
    
    score = 0;
    currentQuiz.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    const percentage = Math.round((score / currentQuiz.length) * 100);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    attemptCount++;
    localStorage.setItem(`quiz_attempts_${currentSkill}`, attemptCount);
    
    saveAttemptData(percentage, timeSpent);
    showResults(percentage, timeSpent);
}

function saveAttemptData(percentage, timeSpent) {
    const storageKey = `quiz_attempts_data_${currentSkill}`;
  
    const attempts = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    attempts.push({
        date: new Date().toISOString(),
        percentage: percentage,
        timeSpent: timeSpent,
        score: score,
        total: currentQuiz.length,
        answers: [...userAnswers]
    });
    
    localStorage.setItem(storageKey, JSON.stringify(attempts));
    
    console.log(`Saved attempt: ${percentage}% (${score}/${currentQuiz.length})`);
}

function showResults(percentage, timeSpent) {
    const quizMain = document.getElementById('quizMain');
    const quizHeader = document.getElementById('quizHeader');
    const questionContainer = document.getElementById('questionContainer');
    const quizFooter = document.getElementById('quizFooter');
    
    if (quizHeader) quizHeader.style.display = 'none';
    if (questionContainer) questionContainer.style.display = 'none';
    if (quizFooter) quizFooter.style.display = 'none';
    
    const resultsScreen = document.createElement('div');
    resultsScreen.className = 'results-screen';
    
    let message, buttonText, buttonAction, showNextSkill;
    
    if (percentage >= 90) {
        message = `Excellent work! You've mastered this skill. You can now proceed to the next skill in your roadmap.`;
        buttonText = 'Continue to Next Skill <i class="fas fa-arrow-right"></i>';
        buttonAction = `window.location.href = '../Roadmap/roadmap.html?skill=${currentSkill}&passed=true'`;
        showNextSkill = true;
    } else {
        message = `You need ${90 - percentage}% more to unlock the next skill. Review the learning materials and try again.`;
        buttonText = 'Retake Quiz <i class="fas fa-redo"></i>';
        buttonAction = 'location.reload()';
        showNextSkill = false;
    }
    
    resultsScreen.innerHTML = `
        <div class="result-circle">
            <span class="result-percentage">${percentage}%</span>
        </div>
        
        <h2 class="result-title">${percentage >= 90 ? 'Congratulations!' : 'Keep Learning!'}</h2>
        
        <p class="result-message">${message}</p>
        
        <div style="background: var(--primary-light); padding: 20px; border-radius: var(--radius-md); margin: 20px 0;">
            <p style="color: var(--text-muted); margin-bottom: 10px;">
                <i class="fas fa-chart-bar"></i> Your Progress:
            </p>
            <p style="font-size: 1.1rem; color: var(--text-main);">
                Correct: <strong style="color: var(--success);">${score}</strong> / ${currentQuiz.length}
            </p>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 5px;">
                Time: ${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s | Attempts: ${attemptCount}
            </p>
        </div>
        
        <div class="result-actions">
            <button class="btn-retake" onclick="${buttonAction}">
                ${buttonText}
            </button>
            
            <a href="performance-analysis.html?skill=${currentSkill}" class="btn-analysis">
                <i class="fas fa-chart-line"></i> Detailed Performance Analysis
            </a>
            
            ${showNextSkill ? `
            <a href="../Roadmap/roadmap.html?skill=${currentSkill}&passed=true" class="btn-next-skill">
                <i class="fas fa-lock-open"></i> Unlock Next Skill
            </a>
            ` : ''}
        </div>
    `;
    
    if (quizMain) {
        quizMain.appendChild(resultsScreen);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const skill = getSkillFromURL();
    loadQuizData(skill);
});

function finishQuiz() {
    console.log('finishQuiz() called!');
    
    clearInterval(timerInterval);
    console.log(' Timer stopped');

    score = 0;
    if (currentQuiz && userAnswers) {
        currentQuiz.forEach((question, index) => {
            if (userAnswers[index] === question.correct) {
                score++;
            }
        });
    }
    
    const percentage = Math.round((score / currentQuiz.length) * 100);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    console.log('Score:', score, '/', currentQuiz.length, '=', percentage + '%');
    console.log('Time spent:', timeSpent, 'seconds');

    attemptCount++;
    localStorage.setItem(`quiz_attempts_${currentSkill}`, attemptCount);
 
    saveAttemptData(percentage, timeSpent);
    console.log('Attempt saved to localStorage');
    
    showResults(percentage, timeSpent);
    console.log('Results displayed');
}