# Complete Vercel Deployment Guide for Snapsuuq Cargo Tracking

## Your MongoDB Connection Details

- **Username:** snapsuuq
- **Password:** gxVFZDR0d8NEt1Ub
- **Full Connection String:** 
  ```
  mongodb+srv://snapsuuq:gxVFZDR0d8NEt1Ub@cluster0.2fnlqe0.mongodb.net/cargo-tracking?appName=Cluster0
  ```

---

## 🚀 Step-by-Step Deployment

### PART 1: Deploy Backend First

#### Step 1: Go to Vercel
1. Visit: https://vercel.com/new
2. Sign in with your GitHub account
3. Click **"Import Git Repository"**

#### Step 2: Import Your Repository
1. Find and select: **`snapsuuq-dotcom/snapquuq`**
2. Click **"Import"**

#### Step 3: Configure Backend Project
1. **Project Name:** `snapsuuq-backend` (or any name you prefer)
2. **Root Directory:** Click "Edit" and set to: **`backend`**
3. **Framework Preset:** Select **"Other"**
4. **Build Command:** Leave empty (or `npm install`)
5. **Output Directory:** Leave empty
6. **Install Command:** `npm install`

#### Step 4: Add Environment Variables
Click **"Environment Variables"** and add these:

```
Variable Name: MONGODB_URI
Value: mongodb+srv://snapsuuq:gxVFZDR0d8NEt1Ub@cluster0.2fnlqe0.mongodb.net/cargo-tracking?appName=Cluster0
```

```
Variable Name: JWT_SECRET
Value: your-secret-jwt-key-change-this-in-production-2024
```

```
Variable Name: NODE_ENV
Value: production
```

```
Variable Name: PORT
Value: 5000
```

```
Variable Name: ALLOWED_ORIGINS
Value: https://your-frontend-url.vercel.app
```
⚠️ **Note:** You'll update this later with your actual frontend URL

#### Step 5: Deploy Backend
1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. **Copy your backend URL** (e.g., `https://snapsuuq-backend.vercel.app`)
   - You'll see this after deployment completes
   - It will be something like: `https://snapsuuq-backend-xxxxx.vercel.app`

#### Step 6: Test Backend
1. Visit: `https://your-backend-url.vercel.app/api/health`
2. Should see: `{"success":true,"message":"Server is running"}`

---

### PART 2: Deploy Frontend

#### Step 1: Create New Vercel Project
1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select: **`snapsuuq-dotcom/snapquuq`** (same repository)

#### Step 2: Configure Frontend Project
1. **Project Name:** `snapsuuq-frontend` (or any name)
2. **Root Directory:** Click "Edit" and set to: **`frontend`**
3. **Framework Preset:** Select **"Vite"** (auto-detected)
4. **Build Command:** `npm run build` (auto-filled)
5. **Output Directory:** `dist` (auto-filled)
6. **Install Command:** `npm install`

#### Step 3: Add Environment Variables
Click **"Environment Variables"** and add:

```
Variable Name: VITE_API_URL
Value: https://your-backend-url.vercel.app/api
```
⚠️ **Replace `your-backend-url` with your actual backend URL from Part 1**

#### Step 4: Deploy Frontend
1. Click **"Deploy"**
2. Wait 1-2 minutes
3. **Copy your frontend URL** (e.g., `https://snapsuuq-frontend.vercel.app`)

---

### PART 3: Update Backend CORS

#### Step 1: Go Back to Backend Project
1. In Vercel dashboard, go to your backend project
2. Click **"Settings"** → **"Environment Variables"**

#### Step 2: Update ALLOWED_ORIGINS
1. Find `ALLOWED_ORIGINS`
2. Click **"Edit"**
3. Update value to your frontend URL:
   ```
   https://your-frontend-url.vercel.app
   ```
   (Use the actual frontend URL from Part 2)

#### Step 3: Redeploy Backend
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. Wait for redeployment to complete

---

## ✅ Final Verification

### Test Your Deployment:

1. **Frontend:**
   - Visit your frontend URL
   - Should load the "Track Your Cargo" page

2. **User Search:**
   - Enter first 4 digits of a phone number (e.g., "3901")
   - Should return search results

3. **Admin Login:**
   - Go to: `https://your-frontend-url.vercel.app/login`
   - Login with admin credentials
   - Should access admin dashboard

4. **Backend API:**
   - Visit: `https://your-backend-url.vercel.app/api/health`
   - Should return: `{"success":true,"message":"Server is running"}`

---

## 📋 Quick Reference

### Backend Environment Variables:
```
MONGODB_URI=mongodb+srv://snapsuuq:gxVFZDR0d8NEt1Ub@cluster0.2fnlqe0.mongodb.net/cargo-tracking?appName=Cluster0
JWT_SECRET=your-secret-jwt-key-change-this-in-production-2024
NODE_ENV=production
PORT=5000
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
```

### Frontend Environment Variables:
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

---

## 🔧 Troubleshooting

### Backend Issues:

**"MongoDB connection error"**
- ✅ Check `MONGODB_URI` is correct in environment variables
- ✅ Verify password: `gxVFZDR0d8NEt1Ub`
- ✅ Check MongoDB Atlas Network Access allows all IPs (0.0.0.0/0)

**"CORS error"**
- ✅ Update `ALLOWED_ORIGINS` with your frontend URL
- ✅ Redeploy backend after updating

### Frontend Issues:

**"API not found" or "Network error"**
- ✅ Check `VITE_API_URL` is correct
- ✅ Make sure it includes `/api` at the end
- ✅ Verify backend is deployed and accessible

**"Build failed"**
- ✅ Check Node.js version (Vercel uses 18.x by default)
- ✅ Make sure all dependencies are in `package.json`

---

## 🎉 You're Done!

After completing these steps, your application will be live at:
- **Frontend:** `https://your-frontend-url.vercel.app`
- **Backend API:** `https://your-backend-url.vercel.app/api`

Both will be connected to your MongoDB Atlas database and fully functional!

---

## 📝 Important Notes

1. **MongoDB Atlas Network Access:**
   - Make sure MongoDB Atlas allows connections from anywhere
   - Go to MongoDB Atlas → Network Access → Add IP Address
   - Add: `0.0.0.0/0` (allows all IPs)

2. **Environment Variables:**
   - These are set in Vercel dashboard, NOT in code
   - They're secure and not visible in your repository

3. **Custom Domains:**
   - You can add custom domains later in Vercel project settings
   - Update `ALLOWED_ORIGINS` when you add custom domain

---

## 🆘 Need Help?

If you encounter any issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas connection logs
3. Verify all environment variables are set correctly
4. Make sure both projects are deployed successfully

Good luck with your deployment! 🚀

