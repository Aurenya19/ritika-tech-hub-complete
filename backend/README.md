# 🚀 Ritika Tech Hub - Backend API

Complete Node.js + Express + MongoDB backend for the learning platform.

## 📋 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- User registration & login
- Password hashing with bcrypt
- Protected routes
- Role-based access control (User/Admin)

### 👤 User Management
- User profiles with avatars
- Progress tracking
- Gamification (points, levels, badges)
- Streak tracking
- Bookmarks & notes

### 📊 Progress Tracking
- Video watch tracking
- Challenge completion
- Project completion
- Certificate generation
- Statistics & analytics

### 🏆 Gamification
- Points system
- Level progression
- Achievement badges
- Streak tracking
- Leaderboards (global & course-specific)

### 📜 Certificate Generation
- PDF certificate generation
- Unique certificate IDs
- Professional design
- Download functionality

### 💬 Discussion Forum
- Create posts
- Reply to discussions
- Like posts & replies
- Accept solutions
- Search & filter
- Real-time updates (Socket.IO)

### 🏅 Leaderboard
- Global rankings
- Course-specific rankings
- User rank & percentile
- Top performers

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **PDF Generation**: PDFKit
- **Real-time**: Socket.IO
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: express-validator
- **Email**: Nodemailer

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Aurenya19/ritika-tech-hub-complete.git
cd ritika-tech-hub-complete/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ritika-tech-hub
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=https://aurenya19.github.io/ritika-tech-hub-complete
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Run the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/update-profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "bio": "Learning enthusiast",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Progress Endpoints

#### Mark Video as Watched
```http
POST /api/progress/video-watched
Authorization: Bearer <token>
Content-Type: application/json

{
  "videoId": "v1",
  "courseId": "webdev"
}
```

#### Mark Challenge as Solved
```http
POST /api/progress/challenge-solved
Authorization: Bearer <token>
Content-Type: application/json

{
  "challengeId": "c1",
  "courseId": "webdev",
  "points": 10,
  "code": "console.log('Hello');"
}
```

#### Get Progress Stats
```http
GET /api/progress/stats
Authorization: Bearer <token>
```

### Certificate Endpoints

#### Generate Certificate
```http
POST /api/certificates/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "webdev",
  "courseName": "Web Development Masterclass"
}
```

#### List Certificates
```http
GET /api/certificates/list
Authorization: Bearer <token>
```

### Leaderboard Endpoints

#### Global Leaderboard
```http
GET /api/leaderboard/global?limit=100&page=1
```

#### Course Leaderboard
```http
GET /api/leaderboard/course/:courseId?limit=50
```

#### My Rank
```http
GET /api/leaderboard/my-rank
Authorization: Bearer <token>
```

### Forum Endpoints

#### Get Forum Posts
```http
GET /api/forum/posts?courseId=webdev&category=question&page=1&limit=20
```

#### Create Post
```http
POST /api/forum/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "How to use React Hooks?",
  "content": "I'm confused about useState...",
  "courseId": "webdev",
  "category": "question",
  "tags": ["react", "hooks"]
}
```

#### Reply to Post
```http
POST /api/forum/posts/:id/reply
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "You can use useState like this..."
}
```

#### Like Post
```http
POST /api/forum/posts/:id/like
Authorization: Bearer <token>
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent abuse
- **JWT**: Secure authentication
- **Password Hashing**: bcrypt with salt
- **Input Validation**: express-validator
- **MongoDB Injection Protection**: Mongoose sanitization

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  role: String (user/admin),
  bio: String,
  videosWatched: Array,
  challengesSolved: Array,
  projectsCompleted: Array,
  certificates: Array,
  totalPoints: Number,
  level: Number,
  badges: Array,
  streak: Object,
  bookmarks: Array,
  notes: Array,
  preferences: Object
}
```

### Forum Model
```javascript
{
  title: String,
  content: String,
  author: ObjectId (ref: User),
  courseId: String,
  category: String,
  tags: Array,
  replies: Array,
  likes: Array,
  views: Number,
  isPinned: Boolean,
  isClosed: Boolean,
  isResolved: Boolean
}
```

## 🚀 Deployment

### Deploy to Heroku
```bash
# Login to Heroku
heroku login

# Create app
heroku create ritika-tech-hub-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=<your-mongodb-uri>
heroku config:set JWT_SECRET=<your-secret>

# Deploy
git push heroku main
```

### Deploy to Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Deploy to Render
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| NODE_ENV | Environment (development/production) | Yes |
| PORT | Server port | Yes |
| MONGODB_URI | MongoDB connection string | Yes |
| JWT_SECRET | JWT secret key | Yes |
| JWT_EXPIRE | JWT expiration time | Yes |
| FRONTEND_URL | Frontend URL for CORS | Yes |
| EMAIL_HOST | SMTP host | No |
| EMAIL_PORT | SMTP port | No |
| EMAIL_USER | SMTP username | No |
| EMAIL_PASSWORD | SMTP password | No |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👩‍💻 Author

**Ritika Saini**
- GitHub: [@Aurenya19](https://github.com/Aurenya19)

## 🙏 Acknowledgments

- Express.js team
- MongoDB team
- All open-source contributors

---

**Built with ❤️ by Bhindi AI**