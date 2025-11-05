# 🚀 Quick Vercel Deployment - Copy & Paste Guide

## Your MongoDB Connection String:
```
mongodb+srv://snapsuuq:gxVFZDR0d8NEt1Ub@cluster0.2fnlqe0.mongodb.net/cargo-tracking?appName=Cluster0
```

---

## BACKEND DEPLOYMENT (Do This First)

### 1. Go to: https://vercel.com/new

### 2. Import Repository:
- Select: `snapsuuq-dotcom/snapquuq`

### 3. Configure:
- **Root Directory:** `backend`
- **Framework:** Other
- **Build Command:** (empty)
- **Output Directory:** (empty)

### 4. Environment Variables (Click "Add"):

**Variable 1:**
```
Name: MONGODB_URI
Value: mongodb+srv://snapsuuq:gxVFZDR0d8NEt1Ub@cluster0.2fnlqe0.mongodb.net/cargo-tracking?appName=Cluster0
```

**Variable 2:**
```
Name: JWT_SECRET
Value: snapsuuq-secret-jwt-key-2024-production
```

**Variable 3:**
```
Name: NODE_ENV
Value: production
```

**Variable 4:**
```
Name: PORT
Value: 5000
```

**Variable 5:**
```
Name: ALLOWED_ORIGINS
Value: https://placeholder-frontend.vercel.app
```
*(You'll update this after frontend deploys)*

### 5. Click "Deploy"
### 6. Copy Backend URL: `https://your-backend.vercel.app`

---

## FRONTEND DEPLOYMENT (Do This Second)

### 1. Go to: https://vercel.com/new

### 2. Import Repository:
- Select: `snapsuuq-dotcom/snapquuq` (same repo)

### 3. Configure:
- **Root Directory:** `frontend`
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### 4. Environment Variables:

**Variable 1:**
```
Name: VITE_API_URL
Value: https://your-backend.vercel.app/api
```
*(Replace with your actual backend URL from above)*

### 5. Click "Deploy"
### 6. Copy Frontend URL: `https://your-frontend.vercel.app`

---

## UPDATE BACKEND CORS (Do This Last)

### 1. Go to Backend Project in Vercel
### 2. Settings → Environment Variables
### 3. Edit `ALLOWED_ORIGINS`:
```
Value: https://your-frontend.vercel.app
```
*(Use your actual frontend URL)*

### 4. Go to Deployments → Redeploy

---

## ✅ TEST IT!

1. Frontend: `https://your-frontend.vercel.app`
2. Backend Health: `https://your-backend.vercel.app/api/health`
3. Search: Try searching with first 4 digits of phone number
4. Admin: `https://your-frontend.vercel.app/login`

---

## 🎯 That's It!

Your app is now live! 🚀

