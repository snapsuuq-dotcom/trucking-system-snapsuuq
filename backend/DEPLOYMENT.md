# Snapsuuq Cargo Backend - Deployment Guide

## 🚀 Deployment Options

### Option 1: Railway (Recommended - Easy & Free Tier Available)

1. **Sign up at [Railway.app](https://railway.app/)**

2. **Install Railway CLI** (Optional):
   ```bash
   npm install -g @railway/cli
   ```

3. **Deploy via GitHub**:
   - Push your code to GitHub
   - Go to Railway Dashboard
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect it's a Node.js project

4. **Set Environment Variables in Railway**:
   - Go to your project → Variables
   - Add these variables:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_strong_random_secret
     NODE_ENV=production
     PORT=5000
     ```

5. **Generate a Strong JWT Secret**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Option 2: Render

1. **Sign up at [Render.com](https://render.com/)**

2. **Create a New Web Service**:
   - Connect your GitHub repository
   - Name: `snapsuuq-cargo-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables**:
   - Same as Railway (see above)

### Option 3: Vercel (Backend)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd backend
   vercel
   ```

3. **Add Environment Variables** via Vercel Dashboard

---

## 🔐 Security Checklist Before Deployment

- [x] ✅ Default admin credentials removed from code
- [ ] ⚠️ Create your admin account manually in MongoDB:
  ```javascript
  // Use MongoDB Compass or shell
  db.admins.insertOne({
    email: "your-secure-email@example.com",
    password: "$2a$10$...", // Use bcrypt to hash your password
    createdAt: new Date(),
    updatedAt: new Date()
  })
  ```
- [ ] ⚠️ Generate a strong JWT_SECRET
- [ ] ⚠️ Never commit `.env` file to GitHub
- [ ] ⚠️ Update MongoDB connection string for production
- [ ] ⚠️ Enable MongoDB Atlas IP whitelist (if using Atlas)

---

## 📝 Create Admin Account Manually

**Method 1: Using MongoDB Compass (GUI)**
1. Open MongoDB Compass
2. Connect to your database
3. Go to `admins` collection
4. Click "Insert Document"
5. Use this format:
   ```json
   {
     "email": "youremail@example.com",
     "password": "your-hashed-password",
     "createdAt": {"$date": "2024-01-01T00:00:00.000Z"},
     "updatedAt": {"$date": "2024-01-01T00:00:00.000Z"}
   }
   ```

**Method 2: Create a One-Time Setup Script**
1. Create `scripts/create-admin.js`:
   ```javascript
   const mongoose = require('mongoose');
   const Admin = require('../models/Admin');
   require('dotenv').config();

   async function createAdmin() {
     await mongoose.connect(process.env.MONGODB_URI);
     
     const email = 'your-email@example.com';
     const password = 'your-secure-password';
     
     const admin = new Admin({ email, password });
     await admin.save();
     
     console.log('Admin created successfully!');
     process.exit(0);
   }

   createAdmin().catch(console.error);
   ```

2. Run once: `node scripts/create-admin.js`
3. **Delete the script after use!**

---

## 🌐 After Deployment

1. **Test your API**:
   ```bash
   curl https://your-backend-url.railway.app/api/health
   ```

2. **Update Frontend API URL** (see frontend deployment guide)

3. **Your backend URL will be**: 
   - Railway: `https://your-app.railway.app`
   - Render: `https://your-app.onrender.com`
   - Vercel: `https://your-app.vercel.app`

---

## 🆘 Troubleshooting

- **Database Connection Error**: Check MongoDB Atlas IP whitelist
- **Port Issues**: Railway/Render set PORT automatically
- **CORS Issues**: Make sure frontend URL is in CORS settings

