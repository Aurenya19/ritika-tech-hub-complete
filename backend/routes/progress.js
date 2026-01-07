const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @route   POST /api/progress/video-watched
// @desc    Mark video as watched
// @access  Private
router.post('/video-watched', protect, async (req, res) => {
    try {
        const { videoId, courseId } = req.body;
        
        const user = await User.findById(req.user.id);
        
        // Check if already watched
        const alreadyWatched = user.videosWatched.find(
            v => v.videoId === videoId && v.courseId === courseId
        );
        
        if (!alreadyWatched) {
            user.videosWatched.push({
                videoId,
                courseId,
                watchedAt: new Date()
            });
            
            // Update streak
            user.updateStreak();
            
            await user.save();
        }
        
        res.json({
            success: true,
            message: 'Video marked as watched',
            videosWatched: user.videosWatched.length,
            streak: user.streak
        });
        
    } catch (error) {
        console.error('Video watched error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// @route   POST /api/progress/challenge-solved
// @desc    Mark challenge as solved
// @access  Private
router.post('/challenge-solved', protect, async (req, res) => {
    try {
        const { challengeId, courseId, points, code } = req.body;
        
        const user = await User.findById(req.user.id);
        
        // Check if already solved
        const alreadySolved = user.challengesSolved.find(
            c => c.challengeId === challengeId && c.courseId === courseId
        );
        
        if (!alreadySolved) {
            user.challengesSolved.push({
                challengeId,
                courseId,
                points,
                code,
                solvedAt: new Date()
            });
            
            // Add points
            user.totalPoints += points;
            user.calculateLevel();
            
            // Update streak
            user.updateStreak();
            
            // Check for badges
            await checkAndAwardBadges(user);
            
            await user.save();
        }
        
        res.json({
            success: true,
            message: 'Challenge solved successfully',
            challengesSolved: user.challengesSolved.length,
            totalPoints: user.totalPoints,
            level: user.level,
            streak: user.streak,
            newBadges: user.badges.slice(-1) // Return last badge if any
        });
        
    } catch (error) {
        console.error('Challenge solved error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// @route   POST /api/progress/project-completed
// @desc    Mark project as completed
// @access  Private
router.post('/project-completed', protect, async (req, res) => {
    try {
        const { projectId, courseId } = req.body;
        
        const user = await User.findById(req.user.id);
        
        // Check if already completed
        const alreadyCompleted = user.projectsCompleted.find(
            p => p.projectId === projectId && p.courseId === courseId
        );
        
        if (!alreadyCompleted) {
            user.projectsCompleted.push({
                projectId,
                courseId,
                completedAt: new Date()
            });
            
            // Add bonus points for project completion
            user.totalPoints += 100;
            user.calculateLevel();
            
            await user.save();
        }
        
        res.json({
            success: true,
            message: 'Project completed successfully',
            projectsCompleted: user.projectsCompleted.length,
            totalPoints: user.totalPoints,
            level: user.level
        });
        
    } catch (error) {
        console.error('Project completed error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// @route   GET /api/progress/stats
// @desc    Get user progress statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        res.json({
            success: true,
            stats: {
                videosWatched: user.videosWatched.length,
                challengesSolved: user.challengesSolved.length,
                projectsCompleted: user.projectsCompleted.length,
                certificates: user.certificates.length,
                totalPoints: user.totalPoints,
                level: user.level,
                streak: user.streak,
                badges: user.badges
            }
        });
        
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// Helper function to check and award badges
async function checkAndAwardBadges(user) {
    const badges = [];
    
    // First Challenge Badge
    if (user.challengesSolved.length === 1) {
        badges.push({
            badgeId: 'first-challenge',
            badgeName: 'First Steps',
            earnedAt: new Date()
        });
    }
    
    // 10 Challenges Badge
    if (user.challengesSolved.length === 10) {
        badges.push({
            badgeId: '10-challenges',
            badgeName: 'Getting Started',
            earnedAt: new Date()
        });
    }
    
    // 50 Challenges Badge
    if (user.challengesSolved.length === 50) {
        badges.push({
            badgeId: '50-challenges',
            badgeName: 'Challenge Master',
            earnedAt: new Date()
        });
    }
    
    // 7 Day Streak Badge
    if (user.streak.current === 7) {
        badges.push({
            badgeId: '7-day-streak',
            badgeName: 'Week Warrior',
            earnedAt: new Date()
        });
    }
    
    // 30 Day Streak Badge
    if (user.streak.current === 30) {
        badges.push({
            badgeId: '30-day-streak',
            badgeName: 'Month Master',
            earnedAt: new Date()
        });
    }
    
    // Add new badges
    badges.forEach(badge => {
        const exists = user.badges.find(b => b.badgeId === badge.badgeId);
        if (!exists) {
            user.badges.push(badge);
        }
    });
}

module.exports = router;