const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// @route   GET /api/challenges
// @desc    Get all challenges
// @access  Public
router.get('/', (req, res) => {
    const { courseId, difficulty } = req.query;
    
    // This would fetch from database
    res.json({
        success: true,
        message: 'Challenges list',
        filters: { courseId, difficulty }
    });
});

// @route   POST /api/challenges/:id/submit
// @desc    Submit challenge solution
// @access  Private
router.post('/:id/submit', protect, async (req, res) => {
    try {
        const { code, language } = req.body;
        const { id } = req.params;
        
        // Here you would:
        // 1. Run the code against test cases
        // 2. Validate the solution
        // 3. Award points if correct
        
        res.json({
            success: true,
            message: 'Solution submitted',
            challengeId: id,
            passed: true,
            pointsEarned: 10
        });
        
    } catch (error) {
        console.error('Submit challenge error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

module.exports = router;