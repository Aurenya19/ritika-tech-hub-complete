# 🎉 DEPLOYMENT GUIDE - Ritika Tech Hub

Complete step-by-step guide to deploy both frontend and backend.

## 📋 Table of Contents
1. [Frontend Deployment (GitHub Pages)](#frontend-deployment)
2. [Backend Deployment Options](#backend-deployment)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## 🌐 Frontend Deployment (GitHub Pages)

### ✅ Already Deployed!
Your frontend is live at: **https://aurenya19.github.io/ritika-tech-hub-complete**

### Manual Deployment (if needed)
1. Go to repository settings
2. Navigate to **Pages** section
3. Under **Source**, select `main` branch
4. Click **Save**
5. Wait 2-3 minutes for deployment

---

## 🚀 Backend Deployment

### Option 1: Heroku (Recommended for beginners)

#### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed

#### Steps

```bash
# 1. Login to Heroku
heroku login

# 2. Create new app
heroku create ritika-tech-hub-api

# 3. Add MongoDB addon (or use MongoDB Atlas)
heroku addons:create mongolab:sandbox

# 4. Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set JWT_EXPIRE=7d
heroku config:set FRONTEND_URL=https://aurenya19.github.io/ritika-tech-hub-complete

# 5. Deploy
cd backend
git init
git add .
git commit -m "Initial backend deployment"
heroku git:remote -a ritika-tech-hub-api
git push heroku main

# 6. Check logs
heroku logs --tail
```

Your API will be live at: `https://ritika-tech-hub-api.herokuapp.com`

---

### Option 2: Railway (Easiest - No CLI needed)

#### Steps

1. **Go to Railway.app**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `ritika-tech-hub-complete`

3. **Configure**
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`

4. **Add Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<generate-random-string>
   JWT_EXPIRE=7d
   FRONTEND_URL=https://aurenya19.github.io/ritika-tech-hub-complete
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get your API URL

---

### Option 3: Render (Free tier available)

#### Steps

1. **Go to Render.com**
   - Visit https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository

3. **Configure**
   - Name: `ritika-tech-hub-api`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables**
   - Click "Environment"
   - Add all variables from `.env.example`

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment

---

### Option 4: Vercel (Serverless)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
cd backend
vercel

# 4. Set environment variables
vercel env add NODE_ENV
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add FRONTEND_URL

# 5. Deploy to production
vercel --prod
```

---

## 🗄️ Database Setup

### Option 1: MongoDB Atlas (Recommended)

#### Steps

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier
   - Select region closest to your users
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `ritika-admin`
   - Password: Generate strong password
   - Save credentials securely

4. **Whitelist IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add specific IPs

5. **Get Connection String**
   - Go to "Database"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `ritika-tech-hub`

Example:
```
mongodb+srv://ritika-admin:<password>@cluster0.xxxxx.mongodb.net/ritika-tech-hub?retryWrites=true&w=majority
```

---

### Option 2: Local MongoDB

```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB
mongod

# Connection string
mongodb://localhost:27017/ritika-tech-hub
```

---

## ⚙️ Environment Configuration

### Backend Environment Variables

Create `.env` file in `backend/` directory:

```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ritika-tech-hub

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=https://aurenya19.github.io/ritika-tech-hub-complete

# Email (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Admin
ADMIN_EMAIL=admin@ritikatechhub.com
ADMIN_PASSWORD=Admin@123
```

### Generate JWT Secret

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🔗 Connect Frontend to Backend

Update `script.js` in frontend:

```javascript
// Add at the top of script.js
const API_URL = 'https://your-backend-url.com/api';

// Example: Update login function
async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
}
```

---

## 🧪 Testing

### Test Backend Locally

```bash
cd backend
npm install
npm run dev
```

Visit: http://localhost:5000/api/health

### Test API Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: MongoNetworkError: failed to connect to server
```

**Solution:**
- Check MongoDB URI is correct
- Verify IP is whitelisted in MongoDB Atlas
- Ensure database user has correct permissions

#### 2. JWT Error
```
Error: jwt malformed
```

**Solution:**
- Ensure JWT_SECRET is set in environment
- Check token format in Authorization header
- Verify token hasn't expired

#### 3. CORS Error
```
Access to fetch blocked by CORS policy
```

**Solution:**
- Add frontend URL to CORS whitelist in `server.js`
- Check FRONTEND_URL environment variable

#### 4. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

---

## 📊 Monitoring

### Check Application Status

```bash
# Heroku
heroku logs --tail -a ritika-tech-hub-api

# Railway
railway logs

# Render
# Check logs in dashboard
```

### Monitor Database

- MongoDB Atlas Dashboard
- Check connection count
- Monitor query performance
- Set up alerts

---

## 🔒 Security Checklist

- [ ] Environment variables set correctly
- [ ] JWT secret is strong (32+ characters)
- [ ] MongoDB user has limited permissions
- [ ] IP whitelist configured
- [ ] HTTPS enabled
- [ ] Rate limiting active
- [ ] CORS configured properly
- [ ] Helmet security headers enabled

---

## 🎯 Post-Deployment

### 1. Test All Features
- [ ] User registration
- [ ] User login
- [ ] Video watching
- [ ] Challenge submission
- [ ] Certificate generation
- [ ] Leaderboard
- [ ] Forum posts

### 2. Update Frontend
- [ ] Update API_URL in frontend
- [ ] Test API integration
- [ ] Verify CORS working

### 3. Monitor
- [ ] Check error logs
- [ ] Monitor API response times
- [ ] Track user registrations

---

## 📞 Support

If you encounter issues:
1. Check logs first
2. Review environment variables
3. Test API endpoints individually
4. Open GitHub issue with details

---

## 🎉 Success!

Your complete full-stack application is now deployed!

- **Frontend:** https://aurenya19.github.io/ritika-tech-hub-complete
- **Backend:** Your deployed API URL
- **Database:** MongoDB Atlas

**Happy Learning! 🚀**