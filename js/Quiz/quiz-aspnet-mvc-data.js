window.aspnetMvcData = [
    {
        question: "What does MVC stand for?",
        answers: [
            "Model View Controller",
            "Module View Component",
            "Model Visual Code",
            "Multiple View Controller"
        ],
        correct: 0,
        topic: "MVC Basics"
    },
    {
        question: "What is the Model in MVC?",
        answers: [
            "The user interface",
            "The data and business logic",
            "The controller",
            "The database"
        ],
        correct: 1,
        topic: "MVC Components"
    },
    {
        question: "What is a Controller?",
        answers: [
            "The database",
            "Handles user input and updates Model/View",
            "The UI",
            "A data model"
        ],
        correct: 1,
        topic: "MVC Components"
    },
    {
        question: "What is Razor syntax?",
        answers: [
            "A database query",
            "A markup syntax for embedding server code",
            "A CSS framework",
            "A JavaScript library"
        ],
        correct: 1,
        topic: "Razor"
    },
    {
        question: "What is Routing in MVC?",
        answers: [
            "Database connections",
            "Mapping URLs to controller actions",
            "File paths",
            "Network routing"
        ],
        correct: 1,
        topic: "Routing"
    },
    {
        question: "What is a View in MVC?",
        answers: [
            "The database",
            "The user interface/presentation layer",
            "The controller",
            "The model"
        ],
        correct: 1,
        topic: "MVC Components"
    },
    {
        question: "What is TempData?",
        answers: [
            "Permanent storage",
            "Data that persists for one request",
            "Session data",
            "Database cache"
        ],
        correct: 1,
        topic: "Data Passing"
    },
    {
        question: "What is ViewBag?",
        answers: [
            "A database view",
            "A dynamic property for passing data to views",
            "A controller",
            "A model"
        ],
        correct: 1,
        topic: "Data Passing"
    },
    {
        question: "What are Action Methods?",
        answers: [
            "Database methods",
            "Methods in controllers that handle requests",
            "View methods",
            "Model methods"
        ],
        correct: 1,
        topic: "Controllers"
    },
    {
        question: "What is Partial View?",
        answers: [
            "A complete page",
            "A reusable view component",
            "A database table",
            "A controller action"
        ],
        correct: 1,
        topic: "Views"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initSkillQuiz(aspnetMvcData, 'aspnet-mvc');
});