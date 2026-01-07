# 🗄️ FREE MongoDB Atlas Setup (2 Minutes)

## Step 1: Create Account (30 seconds)
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with **Google** (fastest)
3. Click **"Create an account"**

## Step 2: Create FREE Cluster (1 minute)
1. Click **"Build a Database"**
2. Select **"M0 FREE"** tier (left option)
3. Choose **"AWS"** provider
4. Select region: **"Mumbai (ap-south-1)"** (closest to India)
5. Cluster Name: `Cluster0` (default is fine)
6. Click **"Create"**

## Step 3: Create Database User (30 seconds)
1. You'll see "Security Quickstart"
2. **Username:** `ritika-admin`
3. **Password:** Click "Autogenerate Secure Password" 
4. **COPY THE PASSWORD** and save it somewhere!
5. Click **"Create User"**

## Step 4: Allow Access (30 seconds)
1. Scroll down to "Where would you like to connect from?"
2. Click **"Add My Current IP Address"**
3. Then click **"Add Entry"** again
4. In "IP Address" field, enter: `0.0.0.0/0`
5. Description: `Allow all`
6. Click **"Add Entry"**
7. Click **"Finish and Close"**

## Step 5: Get Connection String (30 seconds)
1. Click **"Connect"** button
2. Select **"Connect your application"**
3. Driver: **Node.js**
4. Version: **5.5 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://ritika-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with the password you saved earlier
7. Add database name before `?`:
   ```
   mongodb+srv://ritika-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ritika-tech-hub?retryWrites=true&w=majority
   ```

## ✅ Done!

Your MongoDB is ready!

**Connection String Format:**
```
mongodb+srv://ritika-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ritika-tech-hub?retryWrites=true&w=majority
```

Use this in Render.com environment variables as `MONGODB_URI`

---

## 📝 Important Notes:

- **FREE Forever** - 512 MB storage
- **No credit card** needed
- **Shared cluster** - perfect for personal use
- **Auto-backups** included

---

## 🔒 Security:

- Password is encrypted
- IP whitelist protects access
- SSL/TLS encryption enabled

**Keep your password safe!** 🔐