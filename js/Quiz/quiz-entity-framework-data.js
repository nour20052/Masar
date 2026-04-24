window.entityFrameworkData = [
    {
        question: "What is Entity Framework?",
        answers: [
            "A web framework",
            "An ORM (Object-Relational Mapper)",
            "A testing framework",
            "A security framework"
        ],
        correct: 1,
        topic: "EF Basics"
    },
    {
        question: "What is DbContext?",
        answers: [
            "A database table",
            "A bridge between your entities and database",
            "A connection string",
            "A query method"
        ],
        correct: 1,
        topic: "DbContext"
    },
    {
        question: "What does DbSet represent?",
        answers: [
            "A single record",
            "A collection of entities for CRUD operations",
            "A database connection",
            "A query result"
        ],
        correct: 1,
        topic: "DbSet"
    },
    {
        question: "What is Code-First approach?",
        answers: [
            "Writing SQL first",
            "Creating classes first, then database",
            "Designing UI first",
            "Writing tests first"
        ],
        correct: 1,
        topic: "Approaches"
    },
    {
        question: "What is migration in EF?",
        answers: [
            "Moving data between tables",
            "Keeping database schema in sync with models",
            "Transferring databases",
            "Backing up data"
        ],
        correct: 1,
        topic: "Migrations"
    },
    {
        question: "What is lazy loading?",
        answers: [
            "Slow queries",
            "Loading related data automatically when accessed",
            "Delayed database connection",
            "Caching data"
        ],
        correct: 1,
        topic: "Loading"
    },
    {
        question: "What does SaveChanges() do?",
        answers: [
            "Deletes data",
            "Persists changes to the database",
            "Creates backup",
            "Rolls back changes"
        ],
        correct: 1,
        topic: "DbContext"
    },
    {
        question: "What is eager loading?",
        answers: [
            "Loading all data at once",
            "Loading related data explicitly with Include()",
            "Fast queries",
            "Pre-fetching data"
        ],
        correct: 1,
        topic: "Loading"
    },
    {
        question: "What is a navigation property?",
        answers: [
            "A URL link",
            "A property that references related entities",
            "A database index",
            "A foreign key"
        ],
        correct: 1,
        topic: "Relationships"
    },
    {
        question: "What is LINQ to Entities?",
        answers: [
            "SQL queries",
            "Writing queries against EF models",
            "Database commands",
            "Stored procedures"
        ],
        correct: 1,
        topic: "LINQ"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initSkillQuiz(entityFrameworkData, 'entity-framework');
});