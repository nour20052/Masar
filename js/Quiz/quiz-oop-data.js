window.oopData = [
    {
        question: "What does OOP stand for?",
        answers: [
            "Object-Oriented Programming",
            "Object-Oriented Process",
            "Operational Oriented Programming",
            "Object Operational Process"
        ],
        correct: 0,
        topic: "OOP Basics"
    },
    {
        question: "What is a class in OOP?",
        answers: [
            "A variable that stores data",
            "A blueprint for creating objects",
            "A function that returns values",
            "A type of loop"
        ],
        correct: 1,
        topic: "Classes & Objects"
    },
    {
        question: "What is an object?",
        answers: [
            "A data type",
            "An instance of a class",
            "A function",
            "A variable"
        ],
        correct: 1,
        topic: "Classes & Objects"
    },
    {
        question: "Which of the following is NOT a pillar of OOP?",
        answers: [
            "Inheritance",
            "Polymorphism",
            "Compilation",
            "Encapsulation"
        ],
        correct: 2,
        topic: "OOP Pillars"
    },
    {
        question: "What is inheritance?",
        answers: [
            "Creating multiple objects from one class",
            "A class deriving properties from another class",
            "Hiding data from outside access",
            "Using the same method in different ways"
        ],
        correct: 1,
        topic: "Inheritance"
    },
    {
        question: "What is encapsulation?",
        answers: [
            "Creating new classes",
            "Binding data and methods together and hiding internal details",
            "Inheriting from parent class",
            "Overriding methods"
        ],
        correct: 1,
        topic: "Encapsulation"
    },
    {
        question: "What is polymorphism?",
        answers: [
            "Creating multiple classes",
            "The ability of objects to take many forms",
            "Hiding data from users",
            "Inheriting multiple classes"
        ],
        correct: 1,
        topic: "Polymorphism"
    },
    {
        question: "What is a constructor?",
        answers: [
            "A method that deletes objects",
            "A special method that initializes objects",
            "A type of variable",
            "A class that cannot be inherited"
        ],
        correct: 1,
        topic: "Constructors"
    },
    {
        question: "What is abstraction?",
        answers: [
            "Showing all details to the user",
            "Hiding complex implementation and showing only essential features",
            "Creating multiple objects",
            "Inheriting from multiple classes"
        ],
        correct: 1,
        topic: "Abstraction"
    },
    {
        question: "What is method overriding?",
        answers: [
            "Creating a new method",
            "Redefining a method in a child class that already exists in parent class",
            "Deleting a method",
            "Calling a method multiple times"
        ],
        correct: 1,
        topic: "Polymorphism"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initSkillQuiz(oopData, 'oop');
});