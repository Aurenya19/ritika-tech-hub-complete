const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false
    },
    avatar: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio cannot be more than 500 characters']
    },
    
    // Learning Progress
    videosWatched: [{
        videoId: String,
        courseId: String,
        watchedAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    challengesSolved: [{
        challengeId: String,
        courseId: String,
        points: Number,
        solvedAt: {
            type: Date,
            default: Date.now
        },
        code: String
    }],
    
    projectsCompleted: [{
        projectId: String,
        courseId: String,
        completedAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    certificates: [{
        certificateId: String,
        courseId: String,
        courseName: String,
        issuedAt: {
            type: Date,
            default: Date.now
        },
        certificateUrl: String
    }],
    
    // Gamification
    totalPoints: {
        type: Number,
        default: 0
    },
    
    level: {
        type: Number,
        default: 1
    },
    
    badges: [{
        badgeId: String,
        badgeName: String,
        earnedAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    streak: {
        current: {
            type: Number,
            default: 0
        },
        longest: {
            type: Number,
            default: 0
        },
        lastActivity: Date
    },
    
    // Bookmarks & Notes
    bookmarks: [{
        type: {
            type: String,
            enum: ['video', 'challenge', 'resource']
        },
        itemId: String,
        courseId: String,
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    notes: [{
        courseId: String,
        content: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: Date
    }],
    
    // Settings
    preferences: {
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        },
        emailNotifications: {
            type: Boolean,
            default: true
        },
        language: {
            type: String,
            enum: ['english', 'hinglish'],
            default: 'hinglish'
        }
    },
    
    // Account Status
    isVerified: {
        type: Boolean,
        default: false
    },
    
    isActive: {
        type: Boolean,
        default: true
    },
    
    lastLogin: Date,
    
    resetPasswordToken: String,
    resetPasswordExpire: Date
    
}, {
    timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Calculate level based on points
userSchema.methods.calculateLevel = function() {
    this.level = Math.floor(this.totalPoints / 100) + 1;
    return this.level;
};

// Update streak
userSchema.methods.updateStreak = function() {
    const today = new Date().setHours(0, 0, 0, 0);
    const lastActivity = this.streak.lastActivity ? 
        new Date(this.streak.lastActivity).setHours(0, 0, 0, 0) : null;
    
    if (!lastActivity) {
        this.streak.current = 1;
        this.streak.lastActivity = new Date();
    } else {
        const daysDiff = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
            this.streak.current += 1;
            if (this.streak.current > this.streak.longest) {
                this.streak.longest = this.streak.current;
            }
        } else if (daysDiff > 1) {
            this.streak.current = 1;
        }
        
        this.streak.lastActivity = new Date();
    }
    
    return this.streak;
};

module.exports = mongoose.model('User', userSchema);