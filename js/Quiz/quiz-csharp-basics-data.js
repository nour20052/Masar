window.csharpBasicsData = [
    {
        question: "What is C#?",
        answers: [
            "A database management system",
            "A modern, object-oriented programming language",
            "A web browser",
            "An operating system"
        ],
        correct: 1,
        topic: "C# Basics"
    },
    {
        question: "Which company developed C#?",
        answers: [
            "Google",
            "Microsoft",
            "Apple",
            "IBM"
        ],
        correct: 1,
        topic: "C# History"
    },
    {
        question: "What is the correct file extension for C# files?",
        answers: [
            ".cpp",
            ".java",
            ".cs",
            ".c"
        ],
        correct: 2,
        topic: "C# Syntax"
    },
    {
        question: "Which keyword is used to declare a variable in C#?",
        answers: [
            "var or specific type (int, string, etc.)",
            "let",
            "dim",
            "variable"
        ],
        correct: 0,
        topic: "Variables"
    },
    {
        question: "What is the correct way to output text in C#?",
        answers: [
            "print()",
            "echo()",
            "Console.WriteLine()",
            "System.out.println()"
        ],
        correct: 2,
        topic: "Console Output"
    },
    {
        question: "Which of the following is a value type in C#?",
        answers: [
            "string",
            "class",
            "int",
            "array"
        ],
        correct: 2,
        topic: "Data Types"
    },
    {
        question: "What is the default value of a boolean in C#?",
        answers: [
            "true",
            "false",
            "null",
            "0"
        ],
        correct: 1,
        topic: "Data Types"
    },
    {
        question: "Which symbol is used for single-line comments in C#?",
        answers: [
            "//",
            "/*",
            "#",
            "--"
        ],
        correct: 0,
        topic: "Syntax"
    },
    {
        question: "What is a namespace in C#?",
        answers: [
            "A type of variable",
            "A container that organizes code",
            "A loop structure",
            "A method"
        ],
        correct: 1,
        topic: "Namespaces"
    },
    {
        question: "Which keyword is used to create a constant in C#?",
        answers: [
            "var",
            "let",
            "const",
            "static"
        ],
        correct: 2,
        topic: "Constants"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initSkillQuiz(csharpBasicsData, 'csharp-basics');
});