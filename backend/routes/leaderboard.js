const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/leaderboard/global
// @desc    Get global leaderboard
// @access  Public
router.get('/global', async (req, res) => {
    try {
        const { limit = 100, page = 1 } = req.query;
        const skip = (page - 1) * limit;
        
        const users = await User.find({ isActive: true })
            .select('name avatar totalPoints level streak badges')
            .sort({ totalPoints: -1 })
            .limit(parseInt(limit))
            .skip(skip);
        
        const total = await User.countDocuments({ isActive: true });
        
        const leaderboard = users.map((user, index) => ({
            rank: skip + index + 1,
            userId: user._id,
            name: user.name,
            avatar: user.avatar,
            totalPoints: user.totalPoints,
            level: user.level,
            streak: user.streak.current,
            badges: user.badges.length
        }));
        
        res.json({
            success: true,
            leaderboard,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
        
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// @route   GET /api/leaderboard/course/:courseId
// @desc    Get course-specific leaderboard
// @access  Public
router.get('/course/:courseId', async (req, res) => {
    try {
        const { courseId } = req.params;
        const { limit = 50 } = req.query;
        
        const users = await User.find({ isActive: true })
            .select('name avatar challengesSolved totalPoints');
        
        // Filter and calculate course-specific points
        const courseLeaderboard = users
            .map(user => {
                const courseChallenges = user.challengesSolved.filter(
                    c => c.courseId === courseId
                );
                const coursePoints = courseChallenges.reduce(
                    (sum, c) => sum + c.points, 0
                );
                
                return {
                    userId: user._id,
                    name: user.name,
                    avatar: user.avatar,
                    coursePoints,
                    challengesSolved: courseChallenges.length
                };
            })
            .filter(user => user.coursePoints > 0)
            .sort((a, b) => b.coursePoints - a.coursePoints)
            .slice(0, limit)
            .map((user, index) => ({
                rank: index + 1,
                ...user
            }));
        
        res.json({
            success: true,
            leaderboard: courseLeaderboard,
            courseId
        });
        
    } catch (error) {
        console.error('Course leaderboard error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// @route   GET /api/leaderboard/my-rank
// @desc    Get current user's rank
// @access  Private
router.get('/my-rank', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        const higherRanked = await User.countDocuments({
            isActive: true,
            totalPoints: { $gt: user.totalPoints }
        });
        
        const rank = higherRanked + 1;
        const total = await User.countDocuments({ isActive: true });
        
        res.json({
            success: true,
            rank,
            totalUsers: total,
            percentile: Math.round((1 - rank / total) * 100),
            totalPoints: user.totalPoints,
            level: user.level
        });
        
    } catch (error) {
        console.error('My rank error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

module.exports = router;