window.webApiData = [
    {
        question: "What is a Web API?",
        answers: [
            "A database",
            "An interface for building HTTP services",
            "A web page",
            "A programming language"
        ],
        correct: 1,
        topic: "API Basics"
    },
    {
        question: "What does REST stand for?",
        answers: [
            "Representational State Transfer",
            "Remote State Transfer",
            "Representational System Transfer",
            "Remote Service Transfer"
        ],
        correct: 0,
        topic: "REST"
    },
    {
        question: "Which HTTP method retrieves data?",
        answers: [
            "POST",
            "PUT",
            "GET",
            "DELETE"
        ],
        correct: 2,
        topic: "HTTP Methods"
    },
    {
        question: "Which HTTP method creates data?",
        answers: [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
        correct: 1,
        topic: "HTTP Methods"
    },
    {
        question: "What is JSON?",
        answers: [
            "A programming language",
            "JavaScript Object Notation - data format",
            "A database",
            "A web framework"
        ],
        correct: 1,
        topic: "JSON"
    },
    {
        question: "What does [ApiController] attribute do?",
        answers: [
            "Creates a database",
            "Enables API-specific behaviors",
            "Creates a view",
            "Defines a model"
        ],
        correct: 1,
        topic: "Attributes"
    },
    {
        question: "What is Swagger?",
        answers: [
            "A database",
            "API documentation tool",
            "A programming language",
            "A web browser"
        ],
        correct: 1,
        topic: "Documentation"
    },
    {
        question: "What is CORS?",
        answers: [
            "Cross-Origin Resource Sharing",
            "Cross-Origin Request System",
            "Common Origin Resource System",
            "Cross-Object Resource Sharing"
        ],
        correct: 0,
        topic: "CORS"
    },
    {
        question: "What is DTO?",
        answers: [
            "Data Transfer Object",
            "Database Table Object",
            "Data Type Object",
            "Direct Transfer Object"
        ],
        correct: 0,
        topic: "DTO"
    },
    {
        question: "Which status code means 'Not Found'?",
        answers: [
            "200",
            "404",
            "500",
            "401"
        ],
        correct: 1,
        topic: "HTTP Status Codes"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initSkillQuiz(webApiData, 'web-api');
});