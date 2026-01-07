const express = require('express');
const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', (req, res) => {
    // This would typically fetch from database
    // For now, returning static data that matches frontend
    res.json({
        success: true,
        courses: [
            {
                id: 'webdev',
                title: 'Web Development Masterclass',
                description: 'Complete web development from basics to advanced full-stack',
                icon: 'fa-globe',
                totalVideos: 8,
                totalChallenges: 8,
                totalQuizzes: 3
            },
            {
                id: 'dsa',
                title: 'Data Structures & Algorithms',
                description: 'Master DSA for coding interviews and competitive programming',
                icon: 'fa-project-diagram',
                totalVideos: 8,
                totalChallenges: 8,
                totalQuizzes: 3
            },
            {
                id: 'database',
                title: 'Database Management',
                description: 'Master SQL, NoSQL, and database design',
                icon: 'fa-database',
                totalVideos: 5,
                totalChallenges: 6,
                totalQuizzes: 2
            }
        ]
    });
});

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    // This would fetch from database
    res.json({
        success: true,
        message: `Course ${id} details would be here`
    });
});

module.exports = router;