const startQuizData = [
    {
        question: "What does SQL stand for?",
        answers: [
            "Structured Query Language",
            "Simple Query Language",
            "System Query Language",
            "Standard Query Language"
        ],
        correct: 0
    },
    {
        question: "Which keyword is used to retrieve data from a database?",
        answers: [
            "GET",
            "EXTRACT",
            "SELECT",
            "FETCH"
        ],
        correct: 2
    },
    {
        question: "What is a Primary Key?",
        answers: [
            "A key that opens the database",
            "A unique identifier for each record",
            "The first column in a table",
            "A password for the database"
        ],
        correct: 1
    },
    {
        question: "Which SQL statement is used to update data?",
        answers: [
            "MODIFY",
            "CHANGE",
            "UPDATE",
            "ALTER"
        ],
        correct: 2
    },
    {
        question: "What does API stand for?",
        answers: [
            "Application Programming Interface",
            "Advanced Programming Interface",
            "Application Process Integration",
            "Automated Programming Interface"
        ],
        correct: 0
    },
    {
        question: "Which HTTP method is used to send data to a server?",
        answers: [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
        correct: 1
    },
    {
        question: "What is C#?",
        answers: [
            "A database",
            "A programming language",
            "A web browser",
            "An operating system"
        ],
        correct: 1
    },
    {
        question: "What does .NET stand for?",
        answers: [
            "Dot Network",
            "Not Only Technology",
            "It's a brand name by Microsoft",
            "New Enhanced Technology"
        ],
        correct: 2
    },
    {
        question: "Which of these is a relational database?",
        answers: [
            "MongoDB",
            "SQL Server",
            "Redis",
            "Elasticsearch"
        ],
        correct: 1
    },
    {
        question: "What is Entity Framework?",
        answers: [
            "A web framework",
            "An ORM (Object-Relational Mapper)",
            "A testing framework",
            "A security framework"
        ],
        correct: 1
    }
];

initQuiz(startQuizData, 'backend');

document.addEventListener('DOMContentLoaded', () => {
    const btnRoadmap = document.getElementById('btnRoadmap');
    if (btnRoadmap) {
        const level = localStorage.getItem('quizLevel') || 'beginner';
        btnRoadmap.href = `../Roadmap/roadmap.html?track=backend&level=${level}`;
    }
});