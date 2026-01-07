const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Forum = require('../models/Forum');

// @route   GET /api/forum/posts
// @desc    Get all forum posts
// @access  Public
router.get('/posts', async (req, res) => {
    try {
        const { courseId, category, page = 1, limit = 20, search } = req.query;
        const skip = (page - 1) * limit;
        
        let query = {};
        
        if (courseId) query.courseId = courseId;
        if (category) query.category = category;
        if (search) {
            query.$text = { $search: search };
        }
        
        const posts = await Forum.find(query)
            .populate('author', 'name avatar')
            .populate('replies.author', 'name avatar')
            .sort({ isPinned: -1, createdAt: -1 })
            .limit(parseInt(limit))
            .skip(skip);
        
        const total = await Forum.countDocuments(query);
        
        res.json({
            success: true,
            posts,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
        
    } catch (error) {
        console.error('Get forum posts error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// @route   POST /api/forum/posts
// @desc    Create a new forum post
// @access  Private
router.post('/posts', protect, async (req, res) => {
    try {
        const { title, content, courseId, category, tags } = req.body;
        
        const post = await Forum.create({
            title,
            content,
            courseId,
            category,
            tags,
            author: req.user.id
        });
        
        await post.populate('author', 'name avatar');
        
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post
        });
        
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// @route   GET /api/forum/posts/:id
// @desc    Get single forum post
// @access  Public
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Forum.findById(req.params.id)
            .populate('author', 'name avatar bio')
            .populate('replies.author', 'name avatar');
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        
        // Increment views
        post.views += 1;
        await post.save();
        
        res.json({
            success: true,
            post
        });
        
    } catch (error) {
        console.error('Get post error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// @route   POST /api/forum/posts/:id/reply
// @desc    Reply to a forum post
// @access  Private
router.post('/posts/:id/reply', protect, async (req, res) => {
    try {
        const { content } = req.body;
        
        const post = await Forum.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        
        if (post.isClosed) {
            return res.status(400).json({
                success: false,
                message: 'This post is closed for replies'
            });
        }
        
        post.replies.push({
            author: req.user.id,
            content,
            createdAt: new Date()
        });
        
        await post.save();
        await post.populate('replies.author', 'name avatar');
        
        res.json({
            success: true,
            message: 'Reply added successfully',
            reply: post.replies[post.replies.length - 1]
        });
        
    } catch (error) {
        console.error('Reply error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// @route   POST /api/forum/posts/:id/like
// @desc    Like/Unlike a forum post
// @access  Private
router.post('/posts/:id/like', protect, async (req, res) => {
    try {
        const post = await Forum.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        
        const likeIndex = post.likes.indexOf(req.user.id);
        
        if (likeIndex > -1) {
            // Unlike
            post.likes.splice(likeIndex, 1);
        } else {
            // Like
            post.likes.push(req.user.id);
        }
        
        await post.save();
        
        res.json({
            success: true,
            likes: post.likes.length,
            isLiked: likeIndex === -1
        });
        
    } catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

// @route   POST /api/forum/posts/:postId/reply/:replyId/accept
// @desc    Accept a reply as solution
// @access  Private
router.post('/posts/:postId/reply/:replyId/accept', protect, async (req, res) => {
    try {
        const post = await Forum.findById(req.params.postId);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        
        // Only post author can accept replies
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Only post author can accept replies'
            });
        }
        
        const reply = post.replies.id(req.params.replyId);
        
        if (!reply) {
            return res.status(404).json({
                success: false,
                message: 'Reply not found'
            });
        }
        
        // Unaccept all other replies
        post.replies.forEach(r => r.isAccepted = false);
        
        // Accept this reply
        reply.isAccepted = true;
        post.isResolved = true;
        
        await post.save();
        
        res.json({
            success: true,
            message: 'Reply accepted as solution'
        });
        
    } catch (error) {
        console.error('Accept reply error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});

module.exports = router;