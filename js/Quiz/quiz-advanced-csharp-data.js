window.advancedCsharpData = [
    {
        question: "What is a delegate in C#?",
        answers: [
            "A type of variable",
            "A type-safe function pointer",
            "A class method",
            "A property"
        ],
        correct: 1,
        topic: "Delegates"
    },
    {
        question: "What is LINQ?",
        answers: [
            "Language Integrated Query",
            "Linear Query",
            "Linked Query",
            "List Query"
        ],
        correct: 0,
        topic: "LINQ"
    },
    {
        question: "What does async/await do?",
        answers: [
            "Makes code run faster",
            "Enables asynchronous programming",
            "Compiles code",
            "Debugs code"
        ],
        correct: 1,
        topic: "Async Programming"
    },
    {
        question: "What is a lambda expression?",
        answers: [
            "A type of loop",
            "An anonymous function",
            "A class",
            "A variable"
        ],
        correct: 1,
        topic: "Lambda Expressions"
    },
    {
        question: "What is garbage collection?",
        answers: [
            "Deleting files",
            "Automatic memory management",
            "Cleaning code",
            "Removing comments"
        ],
        correct: 1,
        topic: "Memory Management"
    },
    {
        question: "What is an interface?",
        answers: [
            "A class with methods",
            "A contract that defines methods without implementation",
            "A variable type",
            "A namespace"
        ],
        correct: 1,
        topic: "Interfaces"
    },
    {
        question: "What is reflection in C#?",
        answers: [
            "Copying code",
            "Inspecting metadata at runtime",
            "Duplicating objects",
            "Mirroring classes"
        ],
        correct: 1,
        topic: "Reflection"
    },
    {
        question: "What is the 'using' statement for?",
        answers: [
            "Importing namespaces",
            "Ensuring proper disposal of resources",
            "Both A and B",
            "Creating variables"
        ],
        correct: 2,
        topic: "Using Statement"
    },
    {
        question: "What is boxing?",
        answers: [
            "Creating objects",
            "Converting value type to reference type",
            "Encapsulating data",
            "Hiding methods"
        ],
        correct: 1,
        topic: "Type Conversion"
    },
    {
        question: "What are generics?",
        answers: [
            "General classes",
            "Type-safe templates for classes/methods",
            "Universal variables",
            "Common methods"
        ],
        correct: 1,
        topic: "Generics"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initSkillQuiz(advancedCsharpData, 'advanced-csharp');
});