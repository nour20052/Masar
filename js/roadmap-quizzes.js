const stepToQuizMap = {
    1: '../Quiz/quiz-programming-basics.html',
    2: '../Quiz/quiz-oop.html',
    3: '../Quiz/quiz-databases.html',
    4: '../Quiz/quiz-csharp-basics.html',
    5: '../Quiz/quiz-advanced-csharp.html',
    6: '../Quiz/quiz-entity-framework.html',
    7: '../Quiz/quiz-aspnet-mvc.html',
    8: '../Quiz/quiz-web-api.html',
    9: '../Quiz/quiz-authentication.html'
};

const stepToSkillMap = {
    1: 'programming-basics',
    2: 'oop',
    3: 'databases',
    4: 'csharp-basics',
    5: 'advanced-csharp',
    6: 'entity-framework',
    7: 'aspnet-mvc',
    8: 'web-api',
    9: 'authentication'
};

function hasPassedQuiz(skillName) {
    const attemptsData = localStorage.getItem(`quiz_attempts_data_${skillName}`);
    if (!attemptsData) return false;
    
    const attempts = JSON.parse(attemptsData);
    if (attempts.length === 0) return false;
    
    const latestAttempt = attempts[attempts.length - 1];
    return latestAttempt.percentage >= 90;
}

function markStepAsCompleted(stepNumber) {
    localStorage.setItem(`step_${stepNumber}`, 'done');
}

function handleQuizButtonClick(stepNumber) {
    const quizPage = stepToQuizMap[stepNumber];
    if (quizPage) {
        window.location.href = quizPage;
    }
}

function initRoadmapQuizzes() {
    console.log('Initializing Roadmap Quiz Integration...');
    
    for (let stepNumber in stepToQuizMap) {
        const step = document.getElementById(`step_${stepNumber}`);
        
        if (!step) continue;
        
        const btn = step.querySelector('button');
        if (!btn) continue;
        
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
  
        newBtn.addEventListener('click', () => {
            const badge = step.querySelector('.badge');
            const badgeText = badge ? badge.textContent : '';
            
            if (badgeText === 'Locked') {
                return; 
            } else {
                handleQuizButtonClick(stepNumber);
            }
        });
        
        console.log(`Step ${stepNumber} initialized`);
    }
    
    checkQuizCompletions();
}

function checkQuizCompletions() {
    for (let stepNumber in stepToSkillMap) {
        const skillName = stepToSkillMap[stepNumber];
        const hasPassed = hasPassedQuiz(skillName);
        
        if (hasPassed) {
            markStepAsCompleted(stepNumber);
            console.log(`Step ${stepNumber} (${skillName}) marked as completed`);
        }
    }
    
    setTimeout(() => {
        if (typeof loadRoadmap === 'function') {
            loadRoadmap();
        }
    }, 100);
}

window.addEventListener('storage', (e) => {
    if (e.key && e.key.includes('quiz_attempts_data_')) {
        console.log('Quiz data updated, reloading roadmap...');
        checkQuizCompletions();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initRoadmapQuizzes();
    }, 500);
});

console.log('Roadmap Quiz Integration loaded successfully!');