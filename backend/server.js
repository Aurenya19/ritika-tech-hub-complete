const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const progressRoutes = require('./routes/progress');
const challengeRoutes = require('./routes/challenges');
const certificateRoutes = require('./routes/certificates');
const forumRoutes = require('./routes/forum');
const leaderboardRoutes = require('./routes/leaderboard');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression Middleware
app.use(compression());

// Logging Middleware
app.use(morgan('combined'));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ritika-tech-hub', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Ritika Tech Hub API is running',
        timestamp: new Date().toISOString()
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Socket.IO for Real-time Features
const io = require('socket.io')(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('👤 User connected:', socket.id);
    
    // Join forum room
    socket.on('join-forum', (forumId) => {
        socket.join(forumId);
        console.log(`User ${socket.id} joined forum ${forumId}`);
    });
    
    // Handle new forum message
    socket.on('forum-message', (data) => {
        io.to(data.forumId).emit('new-message', data);
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('👤 User disconnected:', socket.id);
    });
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed');
            process.exit(0);
        });
    });
});

module.exports = app;