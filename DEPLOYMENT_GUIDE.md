# Vercel Deployment Guide for Snapsuuq Cargo Tracking System

This guide will help you deploy both the frontend and backend to Vercel.

## Prerequisites

1. **GitHub Account** (or GitLab/Bitbucket)
2. **Vercel Account** (sign up at https://vercel.com)
3. **MongoDB Atlas** (already configured)

## Deployment Options

You have two options:
1. **Deploy Frontend and Backend Separately** (Recommended)
2. **Deploy as Monorepo** (Single Vercel project)

---

## Option 1: Deploy Separately (Recommended)

### Step 1: Deploy Backend First

1. **Push backend to GitHub:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository (backend folder)
   - Configure:
     - **Framework Preset:** Other
     - **Root Directory:** `backend`
     - **Build Command:** Leave empty (or `npm install`)
     - **Output Directory:** Leave empty
     - **Install Command:** `npm install`

3. **Add Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add these variables:
     ```
     MONGODB_URI=mongodb+srv://snapsuuq:YOUR_PASSWORD@cluster0.2fnlqe0.mongodb.net/cargo-tracking?appName=Cluster0
     PORT=5000
     NODE_ENV=production
     JWT_SECRET=your-secret-jwt-key-change-this-in-production
     ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
     ```

4. **Note the Backend URL:**
   - After deployment, Vercel will give you a URL like: `https://your-backend.vercel.app`
   - Copy this URL - you'll need it for the frontend

### Step 2: Deploy Frontend

1. **Update Frontend API URL:**
   - Update `frontend/src/utils/api.js` to use your backend URL
   - Or use environment variables (see below)

2. **Push frontend to GitHub:**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository (frontend folder)
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

4. **Add Environment Variables in Vercel:**
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

5. **Update Backend CORS:**
   - Go back to your backend Vercel project
   - Add/Update `ALLOWED_ORIGINS` to include your frontend URL:
     ```
     ALLOWED_ORIGINS=https://your-frontend.vercel.app
     ```

---

## Option 2: Deploy as Monorepo (Single Project)

If you want to deploy both in one Vercel project:

1. **Create vercel.json in root:**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "frontend/package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "frontend/dist"
         }
       },
       {
         "src": "backend/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "backend/server.js"
       },
       {
         "src": "/(.*)",
         "dest": "frontend/$1"
     ]
   }
   ```

2. **Update package.json in root:**
   ```json
   {
     "scripts": {
       "build": "cd frontend && npm install && npm run build"
     }
   }
   ```

3. **Deploy:**
   - Push to GitHub
   - Import to Vercel
   - Set environment variables

---

## Important Configuration Files

### Frontend Environment Variables

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

### Backend Server Configuration

Update `backend/server.js` to handle Vercel's serverless environment:

```javascript
// At the end of server.js, replace app.listen with:
const PORT = process.env.PORT || 5000;

// For Vercel serverless
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // For local development
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
  });
}
```

---

## Step-by-Step Deployment (Recommended Method)

### Backend Deployment

1. **Prepare backend:**
   ```bash
   cd backend
   ```

2. **Create vercel.json** (already created above)

3. **Update server.js for Vercel:**
   - The server needs to export the app for Vercel's serverless functions

4. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Backend ready for deployment"
   git remote add origin https://github.com/YOUR_USERNAME/cargo-backend.git
   git push -u origin main
   ```

5. **Deploy on Vercel:**
   - Visit https://vercel.com/new
   - Import GitHub repository
   - Set Root Directory: `backend`
   - Add environment variables
   - Deploy

### Frontend Deployment

1. **Update API URL:**
   - Update `frontend/src/utils/api.js` to use environment variable

2. **Push to GitHub:**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Frontend ready for deployment"
   git remote add origin https://github.com/YOUR_USERNAME/cargo-frontend.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Visit https://vercel.com/new
   - Import GitHub repository
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add `VITE_API_URL` environment variable
   - Deploy

---

## Post-Deployment Checklist

- [ ] Backend is accessible at `https://your-backend.vercel.app/api/health`
- [ ] Frontend is accessible at `https://your-frontend.vercel.app`
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] MongoDB connection is working
- [ ] Admin login works
- [ ] User search works

---

## Troubleshooting

### Backend Issues:
- **CORS Errors:** Update `ALLOWED_ORIGINS` in environment variables
- **MongoDB Connection:** Check `MONGODB_URI` is correct
- **Serverless Timeout:** Vercel functions have a 10s timeout limit for free tier

### Frontend Issues:
- **API Not Found:** Check `VITE_API_URL` environment variable
- **Build Errors:** Check Node.js version (Vercel uses Node 18.x by default)

---

## Custom Domain Setup

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `ALLOWED_ORIGINS` to include your custom domain

---

## Important Notes

- Vercel serverless functions have execution time limits (10s free, 60s pro)
- MongoDB Atlas connection should be stable
- Make sure to use strong JWT_SECRET in production
- Keep your `.env` files out of Git (use `.gitignore`)

