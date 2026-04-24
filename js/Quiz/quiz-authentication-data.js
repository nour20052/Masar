window.authenticationData = [
    {
        question: "What is Authentication?",
        answers: [
            "Granting permissions",
            "Verifying user identity",
            "Encrypting data",
            "Storing passwords"
        ],
        correct: 1,
        topic: "Authentication"
    },
    {
        question: "What is Authorization?",
        answers: [
            "Verifying identity",
            "Determining what user can access",
            "Logging users in",
            "Hashing passwords"
        ],
        correct: 1,
        topic: "Authorization"
    },
    {
        question: "What is JWT?",
        answers: [
            "Java Web Token",
            "JSON Web Token",
            "JavaScript Web Token",
            "Java Wire Token"
        ],
        correct: 1,
        topic: "JWT"
    },
    {
        question: "What is hashing?",
        answers: [
            "Encrypting data",
            "Converting data to fixed-length value",
            "Compressing files",
            "Encoding strings"
        ],
        correct: 1,
        topic: "Security"
    },
    {
        question: "What is salting?",
        answers: [
            "Adding flavor to code",
            "Adding random data to passwords before hashing",
            "Compressing data",
            "Encrypting databases"
        ],
        correct: 1,
        topic: "Security"
    },
    {
        question: "What is OAuth?",
        answers: [
            "Open Authentication",
            "Open Authorization - standard for token-based auth",
            "Original Authentication",
            "Online Authorization"
        ],
        correct: 1,
        topic: "OAuth"
    },
    {
        question: "What is Identity in ASP.NET?",
        answers: [
            "A database",
            "A membership system for user management",
            "A controller",
            "A view"
        ],
        correct: 1,
        topic: "ASP.NET Identity"
    },
    {
        question: "What is a claim?",
        answers: [
            "A database record",
            "A piece of information about a user",
            "A method",
            "A property"
        ],
        correct: 1,
        topic: "Claims"
    },
    {
        question: "What is role-based authorization?",
        answers: [
            "Password-based login",
            "Controlling access based on user roles",
            "Token generation",
            "User registration"
        ],
        correct: 1,
        topic: "Authorization"
    },
    {
        question: "What is HTTPS?",
        answers: [
            "HyperText Transfer Protocol Secure",
            "HyperText Transfer Protocol Standard",
            "HyperText Transmission Protocol Secure",
            "HyperText Transfer Protocol System"
        ],
        correct: 0,
        topic: "Security"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initSkillQuiz(authenticationData, 'authentication');
});