// Complete Course Data with Real YouTube Videos
const COMPLETE_COURSE_DATA = {
    webdev: {
        id: 'webdev',
        title: 'Web Development Masterclass',
        icon: 'fa-globe',
        description: 'Complete web development from basics to advanced full-stack',
        roadmap: [
            {
                step: 1,
                title: 'HTML Fundamentals',
                duration: '2 weeks',
                topics: ['HTML Structure', 'Tags & Elements', 'Forms & Input', 'Semantic HTML', 'Accessibility'],
                status: 'available'
            },
            {
                step: 2,
                title: 'CSS Mastery',
                duration: '3 weeks',
                topics: ['Selectors & Properties', 'Flexbox & Grid', 'Responsive Design', 'Animations', 'CSS Variables'],
                status: 'locked'
            },
            {
                step: 3,
                title: 'JavaScript Essentials',
                duration: '4 weeks',
                topics: ['Variables & Data Types', 'Functions & Scope', 'DOM Manipulation', 'Events', 'Async Programming'],
                status: 'locked'
            },
            {
                step: 4,
                title: 'React.js',
                duration: '5 weeks',
                topics: ['Components', 'State & Props', 'Hooks', 'Context API', 'React Router'],
                status: 'locked'
            },
            {
                step: 5,
                title: 'Node.js & Backend',
                duration: '4 weeks',
                topics: ['Express.js', 'REST APIs', 'Authentication', 'Database Integration', 'Deployment'],
                status: 'locked'
            }
        ],
        videos: [
            {
                id: 'v1',
                title: 'HTML Introduction - Hinglish',
                duration: '15:30',
                language: 'Hinglish',
                youtubeId: 'qz0aGYrrlhU',
                description: 'HTML ke basics seekhein - tags, elements, aur structure',
                watched: false
            },
            {
                id: 'v2',
                title: 'HTML Forms Complete Guide',
                duration: '25:15',
                language: 'Hinglish',
                youtubeId: 'fNcJuPIZ2WE',
                description: 'Forms banane ka complete guide with validation',
                watched: false
            },
            {
                id: 'v3',
                title: 'CSS Flexbox Tutorial',
                duration: '22:10',
                language: 'English',
                youtubeId: 'JJSoEo8JSnc',
                description: 'Master CSS Flexbox for responsive layouts',
                watched: false
            },
            {
                id: 'v4',
                title: 'CSS Grid Layout - Hinglish',
                duration: '24:30',
                language: 'Hinglish',
                youtubeId: 'EFafSYg-PkI',
                description: 'CSS Grid se powerful layouts banayein',
                watched: false
            },
            {
                id: 'v5',
                title: 'JavaScript Basics - Variables',
                duration: '19:45',
                language: 'Hinglish',
                youtubeId: 'W6NZfCO5SIk',
                description: 'JavaScript variables aur data types',
                watched: false
            },
            {
                id: 'v6',
                title: 'JavaScript Functions',
                duration: '21:20',
                language: 'English',
                youtubeId: 'N8ap4k_1QEQ',
                description: 'Understanding functions in JavaScript',
                watched: false
            },
            {
                id: 'v7',
                title: 'DOM Manipulation - Hinglish',
                duration: '26:15',
                language: 'Hinglish',
                youtubeId: 'y17RuWkWdn8',
                description: 'DOM ko manipulate karna seekhein',
                watched: false
            },
            {
                id: 'v8',
                title: 'React Introduction',
                duration: '17:30',
                language: 'English',
                youtubeId: 'Tn6-PIqc4UM',
                description: 'Getting started with React.js',
                watched: false
            }
        ],
        challenges: [
            {
                id: 'c1',
                title: 'Create Your First HTML Page',
                difficulty: 'beginner',
                points: 10,
                description: 'Build a simple HTML page with headings, paragraphs, images, and links',
                testCases: [
                    'Must have <!DOCTYPE html>',
                    'Must have <head> and <body>',
                    'Must have at least 3 headings',
                    'Must have at least 1 image'
                ],
                solution: '<!DOCTYPE html>\\n<html>\\n<head>\\n<title>My Page</title>\\n</head>\\n<body>\\n<h1>Welcome</h1>\\n<p>Hello World</p>\\n<img src="image.jpg">\\n</body>\\n</html>',
                completed: false
            },
            {
                id: 'c2',
                title: 'Build Registration Form',
                difficulty: 'beginner',
                points: 15,
                description: 'Create a complete registration form with validation',
                testCases: [
                    'Must have name input',
                    'Must have email input',
                    'Must have password input',
                    'Must have submit button'
                ],
                completed: false
            },
            {
                id: 'c3',
                title: 'Style a Landing Page',
                difficulty: 'intermediate',
                points: 25,
                description: 'Design and style a modern landing page using CSS',
                testCases: [
                    'Must use Flexbox or Grid',
                    'Must be responsive',
                    'Must have navigation',
                    'Must have hero section'
                ],
                completed: false
            },
            {
                id: 'c4',
                title: 'Responsive Navigation Menu',
                difficulty: 'intermediate',
                points: 30,
                description: 'Build a mobile-responsive navigation menu with hamburger icon',
                completed: false
            },
            {
                id: 'c5',
                title: 'JavaScript Calculator',
                difficulty: 'intermediate',
                points: 35,
                description: 'Build a functional calculator using JavaScript',
                completed: false
            },
            {
                id: 'c6',
                title: 'Todo App with Local Storage',
                difficulty: 'advanced',
                points: 50,
                description: 'Create a todo application that saves data to localStorage',
                completed: false
            },
            {
                id: 'c7',
                title: 'Weather App with API',
                difficulty: 'advanced',
                points: 60,
                description: 'Build a weather app using external weather API',
                completed: false
            },
            {
                id: 'c8',
                title: 'E-commerce Product Page',
                difficulty: 'advanced',
                points: 70,
                description: 'Create a complete product page with cart functionality',
                completed: false
            }
        ],
        quizzes: [
            {
                id: 'q1',
                title: 'HTML Basics Quiz',
                questions: 10,
                duration: '15 min',
                passingScore: 70
            },
            {
                id: 'q2',
                title: 'CSS Fundamentals Quiz',
                questions: 15,
                duration: '20 min',
                passingScore: 70
            },
            {
                id: 'q3',
                title: 'JavaScript Essentials Quiz',
                questions: 20,
                duration: '30 min',
                passingScore: 75
            }
        ],
        resources: [
            {
                title: 'HTML Cheatsheet',
                type: 'PDF',
                size: '2.5 MB',
                downloadUrl: '#'
            },
            {
                title: 'CSS Properties Guide',
                type: 'PDF',
                size: '3.2 MB',
                downloadUrl: '#'
            },
            {
                title: 'JavaScript ES6 Features',
                type: 'Article',
                downloadUrl: '#'
            },
            {
                title: 'React Documentation',
                type: 'Link',
                downloadUrl: 'https://react.dev'
            }
        ]
    },
    dsa: {
        id: 'dsa',
        title: 'Data Structures & Algorithms',
        icon: 'fa-project-diagram',
        description: 'Master DSA for coding interviews and competitive programming',
        roadmap: [
            {
                step: 1,
                title: 'Programming Basics',
                duration: '3 weeks',
                topics: ['C++ Basics', 'Python Basics', 'Input/Output', 'Operators', 'Control Flow'],
                status: 'available'
            },
            {
                step: 2,
                title: 'Arrays & Strings',
                duration: '2 weeks',
                topics: ['Array Operations', 'Two Pointers', 'Sliding Window', 'String Manipulation', 'Pattern Matching'],
                status: 'locked'
            },
            {
                step: 3,
                title: 'Linked Lists',
                duration: '2 weeks',
                topics: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'Fast & Slow Pointers'],
                status: 'locked'
            },
            {
                step: 4,
                title: 'Stacks & Queues',
                duration: '2 weeks',
                topics: ['Stack Implementation', 'Queue Implementation', 'Monotonic Stack', 'Priority Queue'],
                status: 'locked'
            },
            {
                step: 5,
                title: 'Trees & Graphs',
                duration: '4 weeks',
                topics: ['Binary Trees', 'BST', 'Tree Traversals', 'Graph Algorithms', 'DFS & BFS'],
                status: 'locked'
            },
            {
                step: 6,
                title: 'Dynamic Programming',
                duration: '4 weeks',
                topics: ['Memoization', 'Tabulation', 'Classic DP Problems', 'Optimization'],
                status: 'locked'
            }
        ],
        videos: [
            {
                id: 'v1',
                title: 'C++ Basics - Hinglish',
                duration: '25:30',
                language: 'Hinglish',
                youtubeId: 'yGB9jhsEsr8',
                description: 'C++ programming ki shuruat',
                watched: false
            },
            {
                id: 'v2',
                title: 'Python Fundamentals',
                duration: '22:45',
                language: 'English',
                youtubeId: 'rfscVS0vtbw',
                description: 'Python basics for beginners',
                watched: false
            },
            {
                id: 'v3',
                title: 'Arrays Introduction - Hinglish',
                duration: '18:20',
                language: 'Hinglish',
                youtubeId: '55l-aZ7_F24',
                description: 'Arrays kya hain aur kaise use karein',
                watched: false
            },
            {
                id: 'v4',
                title: 'Array Problems & Solutions',
                duration: '30:15',
                language: 'Hinglish',
                youtubeId: 'oaVa-9wmpns',
                description: 'Common array problems solve karna',
                watched: false
            },
            {
                id: 'v5',
                title: 'Linked List Basics',
                duration: '24:10',
                language: 'English',
                youtubeId: 'R9PTBwOzceo',
                description: 'Understanding linked lists',
                watched: false
            },
            {
                id: 'v6',
                title: 'Stack Implementation - Hinglish',
                duration: '20:30',
                language: 'Hinglish',
                youtubeId: 'GYptUgnIM_I',
                description: 'Stack data structure implement karna',
                watched: false
            },
            {
                id: 'v7',
                title: 'Binary Trees',
                duration: '28:45',
                language: 'English',
                youtubeId: 'fAAZixBzIAI',
                description: 'Binary tree concepts and operations',
                watched: false
            },
            {
                id: 'v8',
                title: 'Graph Algorithms - Hinglish',
                duration: '32:20',
                language: 'Hinglish',
                youtubeId: 'tWVWeAqZ0WU',
                description: 'Graph algorithms aur traversals',
                watched: false
            }
        ],
        challenges: [
            {
                id: 'c1',
                title: 'Two Sum Problem',
                difficulty: 'beginner',
                points: 10,
                description: 'Find two numbers in array that add up to target',
                completed: false
            },
            {
                id: 'c2',
                title: 'Reverse an Array',
                difficulty: 'beginner',
                points: 10,
                description: 'Reverse array elements in-place',
                completed: false
            },
            {
                id: 'c3',
                title: 'Valid Parentheses',
                difficulty: 'intermediate',
                points: 25,
                description: 'Check if parentheses are balanced using stack',
                completed: false
            },
            {
                id: 'c4',
                title: 'Merge Two Sorted Lists',
                difficulty: 'intermediate',
                points: 30,
                description: 'Merge two sorted linked lists into one',
                completed: false
            },
            {
                id: 'c5',
                title: 'Binary Tree Traversal',
                difficulty: 'intermediate',
                points: 35,
                description: 'Implement inorder, preorder, and postorder traversals',
                completed: false
            },
            {
                id: 'c6',
                title: 'Longest Common Subsequence',
                difficulty: 'advanced',
                points: 50,
                description: 'Find LCS using dynamic programming',
                completed: false
            },
            {
                id: 'c7',
                title: 'Graph Cycle Detection',
                difficulty: 'advanced',
                points: 60,
                description: 'Detect cycle in directed graph using DFS',
                completed: false
            },
            {
                id: 'c8',
                title: 'Shortest Path Algorithm',
                difficulty: 'advanced',
                points: 70,
                description: 'Implement Dijkstra algorithm for shortest path',
                completed: false
            }
        ],
        quizzes: [
            {
                id: 'q1',
                title: 'Arrays & Strings Quiz',
                questions: 15,
                duration: '20 min',
                passingScore: 70
            },
            {
                id: 'q2',
                title: 'Linked Lists Quiz',
                questions: 12,
                duration: '15 min',
                passingScore: 70
            },
            {
                id: 'q3',
                title: 'Trees & Graphs Quiz',
                questions: 20,
                duration: '30 min',
                passingScore: 75
            }
        ],
        resources: [
            {
                title: 'C++ STL Cheatsheet',
                type: 'PDF',
                size: '1.8 MB',
                downloadUrl: '#'
            },
            {
                title: 'Python Data Structures',
                type: 'PDF',
                size: '2.2 MB',
                downloadUrl: '#'
            },
            {
                title: 'Big O Notation Guide',
                type: 'Article',
                downloadUrl: '#'
            },
            {
                title: 'LeetCode Problem List',
                type: 'Link',
                downloadUrl: 'https://leetcode.com'
            }
        ]
    },
    database: {
        id: 'database',
        title: 'Database Management',
        icon: 'fa-database',
        description: 'Master SQL, NoSQL, and database design',
        roadmap: [
            {
                step: 1,
                title: 'Database Fundamentals',
                duration: '1 week',
                topics: ['DBMS Concepts', 'Relational Model', 'ER Diagrams', 'Normalization'],
                status: 'available'
            },
            {
                step: 2,
                title: 'SQL Basics',
                duration: '2 weeks',
                topics: ['SELECT Queries', 'WHERE Clause', 'Joins', 'Aggregate Functions'],
                status: 'locked'
            },
            {
                step: 3,
                title: 'Advanced SQL',
                duration: '3 weeks',
                topics: ['Subqueries', 'Views', 'Stored Procedures', 'Triggers', 'Transactions'],
                status: 'locked'
            },
            {
                step: 4,
                title: 'MySQL',
                duration: '2 weeks',
                topics: ['MySQL Setup', 'Indexing', 'Query Optimization', 'Backup & Recovery'],
                status: 'locked'
            },
            {
                step: 5,
                title: 'MongoDB & NoSQL',
                duration: '3 weeks',
                topics: ['Document Model', 'CRUD Operations', 'Aggregation', 'Indexing'],
                status: 'locked'
            }
        ],
        videos: [
            {
                id: 'v1',
                title: 'Database Introduction - Hinglish',
                duration: '15:30',
                language: 'Hinglish',
                youtubeId: 'FR4QIeZaPeM',
                description: 'Database basics aur concepts',
                watched: false
            },
            {
                id: 'v2',
                title: 'SQL SELECT Queries',
                duration: '20:45',
                language: 'English',
                youtubeId: 'HXV3zeQKqGY',
                description: 'Learn SQL SELECT statements',
                watched: false
            },
            {
                id: 'v3',
                title: 'SQL Joins Explained - Hinglish',
                duration: '25:15',
                language: 'Hinglish',
                youtubeId: '9yeOJ0ZMUYw',
                description: 'SQL joins ko samajhein',
                watched: false
            },
            {
                id: 'v4',
                title: 'MySQL Tutorial',
                duration: '30:20',
                language: 'English',
                youtubeId: '7S_tz1z_5bA',
                description: 'Complete MySQL tutorial',
                watched: false
            },
            {
                id: 'v5',
                title: 'MongoDB Basics - Hinglish',
                duration: '22:10',
                language: 'Hinglish',
                youtubeId: 'ExcRbA7fy_A',
                description: 'MongoDB introduction aur basics',
                watched: false
            }
        ],
        challenges: [
            {
                id: 'c1',
                title: 'Create Your First Table',
                difficulty: 'beginner',
                points: 10,
                description: 'Design and create a simple database table',
                completed: false
            },
            {
                id: 'c2',
                title: 'Basic SELECT Queries',
                difficulty: 'beginner',
                points: 15,
                description: 'Write queries to fetch data from tables',
                completed: false
            },
            {
                id: 'c3',
                title: 'JOIN Multiple Tables',
                difficulty: 'intermediate',
                points: 25,
                description: 'Combine data from multiple tables using joins',
                completed: false
            },
            {
                id: 'c4',
                title: 'Aggregate Functions',
                difficulty: 'intermediate',
                points: 30,
                description: 'Use COUNT, SUM, AVG, MIN, MAX functions',
                completed: false
            },
            {
                id: 'c5',
                title: 'Subqueries Challenge',
                difficulty: 'advanced',
                points: 40,
                description: 'Write complex nested queries',
                completed: false
            },
            {
                id: 'c6',
                title: 'Database Design Project',
                difficulty: 'advanced',
                points: 60,
                description: 'Design a complete database schema for e-commerce',
                completed: false
            }
        ],
        quizzes: [
            {
                id: 'q1',
                title: 'SQL Basics Quiz',
                questions: 15,
                duration: '20 min',
                passingScore: 70
            },
            {
                id: 'q2',
                title: 'Database Design Quiz',
                questions: 12,
                duration: '15 min',
                passingScore: 70
            }
        ],
        resources: [
            {
                title: 'SQL Commands Cheatsheet',
                type: 'PDF',
                size: '1.5 MB',
                downloadUrl: '#'
            },
            {
                title: 'MongoDB Query Guide',
                type: 'PDF',
                size: '2.0 MB',
                downloadUrl: '#'
            },
            {
                title: 'Database Design Principles',
                type: 'Article',
                downloadUrl: '#'
            }
        ]
    }
};