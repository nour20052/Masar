window.databasesData = [
    {
        question: "What does SQL stand for?",
        answers: [
            "Structured Query Language",
            "Simple Query Language",
            "System Query Language",
            "Standard Query Language"
        ],
        correct: 0,
        topic: "SQL Basics"
    },
    {
        question: "Which SQL statement is used to retrieve data?",
        answers: [
            "GET",
            "FETCH",
            "SELECT",
            "RETRIEVE"
        ],
        correct: 2,
        topic: "SQL Commands"
    },
    {
        question: "What is a Primary Key?",
        answers: [
            "The first column in any table",
            "A unique identifier for each record",
            "A key that unlocks the database",
            "The most important column"
        ],
        correct: 1,
        topic: "Database Keys"
    },
    {
        question: "Which SQL clause is used to filter records?",
        answers: [
            "FILTER BY",
            "WHERE",
            "HAVING",
            "CONDITION"
        ],
        correct: 1,
        topic: "SQL Clauses"
    },
    {
        question: "What is a Foreign Key?",
        answers: [
            "A password for the database",
            "A key that references a Primary Key in another table",
            "An external database connection",
            "A backup key"
        ],
        correct: 1,
        topic: "Database Keys"
    },
    {
        question: "Which SQL statement is used to add new records?",
        answers: [
            "ADD",
            "CREATE",
            "INSERT",
            "NEW"
        ],
        correct: 2,
        topic: "SQL Commands"
    },
    {
        question: "What is a JOIN used for?",
        answers: [
            "To delete multiple tables",
            "To combine rows from two or more tables",
            "To create a new database",
            "To backup data"
        ],
        correct: 1,
        topic: "SQL Joins"
    },
    {
        question: "Which SQL function returns the number of rows?",
        answers: [
            "SUM()",
            "TOTAL()",
            "COUNT()",
            "NUMBER()"
        ],
        correct: 2,
        topic: "SQL Functions"
    },
    {
        question: "What does ACID stand for in databases?",
        answers: [
            "Atomicity, Consistency, Isolation, Durability",
            "Access, Control, Integrity, Data",
            "Application, Code, Interface, Database",
            "Automatic, Clean, Indexed, Fast"
        ],
        correct: 0,
        topic: "Database Properties"
    },
    {
        question: "Which SQL statement is used to modify existing data?",
        answers: [
            "CHANGE",
            "MODIFY",
            "UPDATE",
            "ALTER"
        ],
        correct: 2,
        topic: "SQL Commands"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initSkillQuiz(databasesData, 'databases');
});