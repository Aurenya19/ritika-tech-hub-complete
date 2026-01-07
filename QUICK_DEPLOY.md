# 🚀 Quick Deploy to Render.com (FREE)

## ✅ Your Backend is Ready to Deploy!

### Step 1: Create Render Account (30 seconds)
1. Go to: https://render.com
2. Click **"Get Started"**
3. Click **"Sign in with GitHub"**
4. Authorize Render

### Step 2: Deploy Backend (2 minutes)
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** if needed
4. Find and select: **`ritika-tech-hub-complete`**
5. Click **"Connect"**

### Step 3: Configure (1 minute)
Fill in these details:

**Name:** `ritika-tech-hub-api`

**Root Directory:** `backend`

**Environment:** `Node`

**Build Command:** `npm install`

**Start Command:** `npm start`

**Plan:** Select **"Free"** (0$/month)

### Step 4: Environment Variables (1 minute)
Scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"** and add these ONE BY ONE:

```
Key: NODE_ENV
Value: production

Key: PORT  
Value: 5000

Key: JWT_SECRET
Value: ritika_tech_hub_super_secret_jwt_key_2025_production

Key: JWT_EXPIRE
Value: 7d

Key: FRONTEND_URL
Value: https://aurenya19.github.io/ritika-tech-hub-complete

Key: MONGODB_URI
Value: mongodb+srv://ritika-admin:Ritika2025@cluster0.mongodb.net/ritika-tech-hub?retryWrites=true&w=majority
```

### Step 5: Deploy! (30 seconds)
1. Click **"Create Web Service"** button at bottom
2. Wait 2-3 minutes for deployment
3. You'll see "Live" status when ready

### Step 6: Get Your API URL
After deployment, you'll see your URL:
```
https://ritika-tech-hub-api.onrender.com
```

Copy this URL!

---

## 🎉 Done!

Your backend is now LIVE and FREE forever!

**API URL:** `https://ritika-tech-hub-api.onrender.com`

**Test it:** Visit `https://ritika-tech-hub-api.onrender.com/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "Ritika Tech Hub API is running"
}
```

---

## 📝 Notes:

- **FREE tier** - No credit card needed
- **Auto-deploys** from GitHub
- **Sleeps after 15 min** of inactivity (wakes up automatically)
- **750 hours/month** FREE

---

## 🔗 Next Step:

Update your frontend to use this API URL!

In `script.js`, add at the top:
```javascript
const API_URL = 'https://ritika-tech-hub-api.onrender.com/api';
```

**That's it! You're done! 🚀**