(function() {
    'use strict';
    let currentSkill = '';
    let quizData = null;
    let attemptsData = [];

    function init() {
        console.log('Performance Analysis - Starting...');
        const urlParams = new URLSearchParams(window.location.search);
        currentSkill = urlParams.get('skill') || 'programming-basics';
        
        console.log(' Analyzing skill:', currentSkill);
        loadQuizData();
    }

    function loadQuizData() {
    const script = document.createElement('script');
    script.src = `../js/quiz/quiz-${currentSkill}-data.js`;
    
    script.onload = () => {
        console.log(' Quiz data loaded');
        const varName = toCamelCase(currentSkill) + 'Data';
        
        console.log(' Looking for variable:', varName);
        console.log('Available variables:', Object.keys(window).filter(k => k.includes('Data')));
        
        quizData = window[varName];
        
        if (quizData) {
            console.log('Found', quizData.length, 'questions');
            setTimeout(() => {
                loadAnalysisData();
            }, 100);
        } else {
            console.error('Quiz data variable not found:', varName);
            showError('Quiz data not found');
        }
    };
    
    script.onerror = () => {
        console.error(' Failed to load quiz data file');
        showError('Failed to load quiz data');
    };
    
    document.body.appendChild(script);
}

function toCamelCase(str) {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

    function loadAnalysisData() {
        const storageKey = `quiz_attempts_data_${currentSkill}`;
        const storedData = localStorage.getItem(storageKey);
        
        console.log('Storage key:', storageKey);
        
        if (storedData) {
            attemptsData = JSON.parse(storedData);
            console.log('Found', attemptsData.length, 'attempts');
            
            if (attemptsData.length > 0) {
                renderAnalysis();
            } else {
                showNoAttempts();
            }
        } else {
            console.log('No attempts found');
            showNoAttempts();
        }
    }

    function renderAnalysis() {
        if (attemptsData.length === 0) return;
        
        const latestAttempt = attemptsData[attemptsData.length - 1];
        
        updateStatsCards(latestAttempt);
        updateQuestionDetails(latestAttempt);
        updateTopicAnalysis(latestAttempt);
        updateAttemptHistory();
        updateSidebar(latestAttempt);
        
        console.log('Analysis rendered successfully');
    }

    function updateStatsCards(attempt) {
        const correctCount = attempt.score;
        const wrongCount = attempt.total - attempt.score;
        const minutes = Math.floor(attempt.timeSpent / 60);
        const seconds = attempt.timeSpent % 60;
        
        const elements = {
            wrongAnswers: wrongCount,
            correctAnswers: correctCount,
            totalAttempts: attemptsData.length,
            timeSpent: `${minutes}:${seconds.toString().padStart(2, '0')}`,
            scorePercentage: `${attempt.percentage}%`,
            currentScore: attempt.percentage
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        });
        
        const retakeBtn = document.getElementById('retakeQuizBtn');
        if (retakeBtn) {
            retakeBtn.href = `quiz-${currentSkill}.html`;
        }
    }

    function updateQuestionDetails(attempt) {
        const container = document.getElementById('questionDetails');
        if (!container || !quizData) return;
        
        container.innerHTML = '';
        const letters = ['A', 'B', 'C', 'D'];
        
        attempt.answers.forEach((userAnswerIndex, questionIndex) => {
            const question = quizData[questionIndex];
            if (!question) return;
            
            const isCorrect = userAnswerIndex === question.correct;
            
            const questionCard = document.createElement('div');
            questionCard.className = `question-card ${isCorrect ? 'correct' : 'incorrect'}`;
            
            questionCard.innerHTML = `
                <div class="question-header">
                    <span class="question-number">Question ${questionIndex + 1}</span>
                    <span class="question-badge ${isCorrect ? 'correct' : 'incorrect'}">
                        <i class="fas ${isCorrect ? 'fa-check' : 'fa-times'}"></i>
                        ${isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                </div>
                <p class="question-text">${question.question}</p>
                <div class="answers-comparison">
                    <div class="answer-row ${isCorrect ? 'correct' : 'user-wrong'}">
                        <span class="answer-label">Your answer:</span>
                        <span class="answer-text">${letters[userAnswerIndex]}. ${question.answers[userAnswerIndex]}</span>
                    </div>
                    ${!isCorrect ? `
                    <div class="answer-row correct">
                        <span class="answer-label">Correct answer:</span>
                        <span class="answer-text">${letters[question.correct]}. ${question.answers[question.correct]}</span>
                    </div>
                    ` : ''}
                </div>
                ${question.topic ? `<span class="topic-badge">${question.topic}</span>` : ''}
            `;
            
            container.appendChild(questionCard);
        });
    }

    function updateTopicAnalysis(attempt) {
        const container = document.getElementById('topicAnalysis');
        if (!container || !quizData) return;
        
        container.innerHTML = '';
        const topicStats = {};
        
        attempt.answers.forEach((userAnswerIndex, questionIndex) => {
            const question = quizData[questionIndex];
            if (!question) return;
            
            const topic = question.topic || 'General';
            
            if (!topicStats[topic]) {
                topicStats[topic] = { total: 0, correct: 0 };
            }
            
            topicStats[topic].total++;
            if (userAnswerIndex === question.correct) {
                topicStats[topic].correct++;
            }
        });
        
        Object.entries(topicStats).forEach(([topicName, stats]) => {
            const percentage = Math.round((stats.correct / stats.total) * 100);
            
            const topicCard = document.createElement('div');
            topicCard.className = 'topic-card';
            
            topicCard.innerHTML = `
                <div class="topic-header">
                    <span class="topic-name">${topicName}</span>
                    <span class="topic-percentage">${percentage}%</span>
                </div>
                <div class="topic-progress-bar">
                    <div class="topic-progress-fill ${getProgressClass(percentage)}" style="width: ${percentage}%"></div>
                </div>
                <div class="topic-details">
                    <span>${stats.correct} correct out of ${stats.total}</span>
                </div>
            `;
            
            container.appendChild(topicCard);
        });
    }

    function updateAttemptHistory() {
        const container = document.getElementById('attemptHistory');
        if (!container) return;
        
        container.innerHTML = '';
        const recentAttempts = attemptsData.slice(-5).reverse();
        
        recentAttempts.forEach((attempt, index) => {
            const isPass = attempt.percentage >= 90;
            const date = new Date(attempt.date);
            const dateStr = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const attemptCard = document.createElement('div');
            attemptCard.className = 'attempt-card';
            
            attemptCard.innerHTML = `
                <div class="attempt-info">
                    <span class="attempt-date">${dateStr}</span>
                    <span class="attempt-number">Attempt #${attemptsData.length - index}</span>
                </div>
                <div class="attempt-result">
                    <span class="attempt-score ${isPass ? 'pass' : 'fail'}">
                        ${isPass ? '✓' : '✗'} ${attempt.percentage}%
                    </span>
                    <div class="attempt-bar">
                        <div class="attempt-bar-fill ${isPass ? 'pass' : 'fail'}" style="width: ${attempt.percentage}%"></div>
                    </div>
                </div>
            `;
            
            container.appendChild(attemptCard);
        });
    }

    function updateSidebar(attempt) {
        const weakContainer = document.getElementById('weakAreas');
        const strongContainer = document.getElementById('strongAreas');
        
        if (!weakContainer || !strongContainer || !quizData) return;
        
        weakContainer.innerHTML = '';
        strongContainer.innerHTML = '';
        
        const topicStats = {};
        
        attempt.answers.forEach((userAnswerIndex, questionIndex) => {
            const question = quizData[questionIndex];
            if (!question) return;
            
            const topic = question.topic || 'General';
            
            if (!topicStats[topic]) {
                topicStats[topic] = { total: 0, correct: 0 };
            }
            
            topicStats[topic].total++;
            if (userAnswerIndex === question.correct) {
                topicStats[topic].correct++;
            }
        });
        
        Object.entries(topicStats).forEach(([topicName, stats]) => {
            const percentage = (stats.correct / stats.total) * 100;
            
            const tag = document.createElement('span');
            tag.className = `area-tag ${percentage >= 80 ? 'strong' : 'weak'}`;
            tag.textContent = topicName;
            
            if (percentage >= 80) {
                strongContainer.appendChild(tag);
            } else {
                weakContainer.appendChild(tag);
            }
        });
        
        if (weakContainer.children.length === 0) {
            weakContainer.innerHTML = '<span class="area-tag strong">All topics mastered! 🎉</span>';
        }
    }

    function getProgressClass(percentage) {
        if (percentage >= 80) return 'good';
        if (percentage >= 50) return 'medium';
        return 'bad';
    }

    function showNoAttempts() {
        const mainContent = document.querySelector('.analysis-main');
        if (!mainContent) return;
        
        mainContent.innerHTML = `
            <div class="no-data-message">
                <i class="fas fa-chart-bar"></i>
                <h2>No Attempts Yet</h2>
                <p>Take the quiz first to see your performance analysis.</p>
                <a href="quiz-${currentSkill}.html" class="btn-primary">
                    <i class="fas fa-play"></i> Start Quiz
                </a>
            </div>
        `;
        
        const sidebar = document.querySelector('.analysis-sidebar');
        if (sidebar) sidebar.style.display = 'none';
    }

    function showError(message) {
        const mainContent = document.querySelector('.analysis-main');
        if (!mainContent) return;
        
        mainContent.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h2>Error</h2>
                <p>${message}</p>
                <a href="../Roadmap/roadmap.html" class="btn-primary">
                    <i class="fas fa-arrow-left"></i> Back to Roadmap
                </a>
            </div>
        `;
    }

    window.PerformanceAnalysis = {
        init,
        loadQuizData,
        loadAnalysisData,
        renderAnalysis
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();