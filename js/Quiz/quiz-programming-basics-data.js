window.programmingBasicsData = [
    {
        question: "What is a variable in programming?",
        answers: [
            "A container that stores data values",
            "A type of loop",
            "A function that returns nothing",
            "A programming language"
        ],
        correct: 0,
        topic: "Variables"
    },
    {
        question: "Which of the following is NOT a primitive data type?",
        answers: [
            "Number",
            "String",
            "Boolean",
            "Array"
        ],
        correct: 3,
        topic: "Data Types"
    },
    {
        question: "What does 'if' statement do?",
        answers: [
            "Creates a loop",
            "Makes decisions based on conditions",
            "Declares a variable",
            "Defines a function"
        ],
        correct: 1,
        topic: "Conditionals"
    },
    {
        question: "What is a loop used for?",
        answers: [
            "To store data",
            "To repeat a block of code multiple times",
            "To end a program",
            "To create variables"
        ],
        correct: 1,
        topic: "Loops"
    },
    {
        question: "What is a function?",
        answers: [
            "A type of variable",
            "A reusable block of code that performs a specific task",
            "A programming error",
            "A data type"
        ],
        correct: 1,
        topic: "Functions"
    },
    {
        question: "What does 'return' do in a function?",
        answers: [
            "Ends the program",
            "Sends a value back to the caller",
            "Creates a loop",
            "Declares a variable"
        ],
        correct: 1,
        topic: "Functions"
    },
    {
        question: "What is an array?",
        answers: [
            "A single value",
            "A collection of values stored in a single variable",
            "A type of function",
            "A programming language"
        ],
        correct: 1,
        topic: "Data Structures"
    },
    {
        question: "What is the index of the first element in an array?",
        answers: [
            "1",
            "0",
            "-1",
            "2"
        ],
        correct: 1,
        topic: "Data Structures"
    },
    {
        question: "What is debugging?",
        answers: [
            "Writing new code",
            "Finding and fixing errors in code",
            "Deleting code",
            "Running a program"
        ],
        correct: 1,
        topic: "Debugging"
    },
    {
        question: "What does '==' operator do?",
        answers: [
            "Assigns a value",
            "Compares two values for equality",
            "Multiplies numbers",
            "Creates a function"
        ],
        correct: 1,
        topic: "Operators"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initSkillQuiz(programmingBasicsData, 'programming-basics');
});