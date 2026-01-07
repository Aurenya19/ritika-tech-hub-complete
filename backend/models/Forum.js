const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    
    content: {
        type: String,
        required: true
    },
    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    courseId: {
        type: String,
        required: true
    },
    
    category: {
        type: String,
        enum: ['question', 'discussion', 'announcement', 'help'],
        default: 'question'
    },
    
    tags: [{
        type: String,
        trim: true
    }],
    
    replies: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
            required: true
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        isAccepted: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    views: {
        type: Number,
        default: 0
    },
    
    isPinned: {
        type: Boolean,
        default: false
    },
    
    isClosed: {
        type: Boolean,
        default: false
    },
    
    isResolved: {
        type: Boolean,
        default: false
    }
    
}, {
    timestamps: true
});

// Index for better search performance
forumSchema.index({ title: 'text', content: 'text', tags: 'text' });
forumSchema.index({ courseId: 1, createdAt: -1 });

module.exports = mongoose.model('Forum', forumSchema);