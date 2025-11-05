# Quick Vercel Deployment Guide

## 🚀 Fast Track Deployment (Recommended)

### Step 1: Deploy Backend (5 minutes)

1. **Push backend to GitHub:**
   ```bash
   cd /Users/radio/Downloads/trucking/trucking-web-main/backend
   git init
   git add .
   git commit -m "Backend ready for Vercel"
   git remote add origin https://github.com/YOUR_USERNAME/cargo-backend.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your `cargo-backend` repository
   - Configure:
     - **Framework Preset:** Other
     - **Root Directory:** `backend` (if monorepo) or leave empty if separate repo
     - **Build Command:** Leave empty
     - **Output Directory:** Leave empty
   
3. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   MONGODB_URI = mongodb+srv://snapsuuq:gxVFZDR0d8NEt1Ub@cluster0.2fnlqe0.mongodb.net/cargo-tracking?appName=Cluster0
   JWT_SECRET = your-secret-jwt-key-change-this-in-production
   NODE_ENV = production
   ALLOWED_ORIGINS = https://your-frontend-url.vercel.app
   ```

4. **Deploy!**
   - Click "Deploy"
   - Wait for deployment (takes 1-2 minutes)
   - Copy your backend URL (e.g., `https://cargo-backend.vercel.app`)

### Step 2: Deploy Frontend (5 minutes)

1. **Update API URL:**
   The frontend already uses environment variables, so we'll set it in Vercel.

2. **Push frontend to GitHub:**
   ```bash
   cd /Users/radio/Downloads/trucking/trucking-web-main/frontend
   git init
   git add .
   git commit -m "Frontend ready for Vercel"
   git remote add origin https://github.com/YOUR_USERNAME/cargo-frontend.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your `cargo-frontend` repository
   - Configure:
     - **Framework Preset:** Vite (auto-detected)
     - **Root Directory:** `frontend` (if monorepo) or leave empty
     - **Build Command:** `npm run build` (auto-filled)
     - **Output Directory:** `dist` (auto-filled)

4. **Add Environment Variables:**
   ```
   VITE_API_URL = https://your-backend-url.vercel.app/api
   ```

5. **Deploy!**
   - Click "Deploy"
   - Wait for deployment
   - Copy your frontend URL

6. **Update Backend CORS:**
   - Go back to backend project on Vercel
   - Settings → Environment Variables
   - Update `ALLOWED_ORIGINS` to include your frontend URL:
     ```
     ALLOWED_ORIGINS = https://your-frontend-url.vercel.app
     ```
   - Redeploy backend

### Step 3: Test

1. Visit your frontend URL
2. Test user search: Enter first 4 digits of a phone number
3. Test admin login: Go to `/login` and log in

---

## 📝 Alternative: Deploy as Monorepo

If you want both in one repository:

1. **Push entire project:**
   ```bash
   cd /Users/radio/Downloads/trucking/trucking-web-main
   git init
   git add .
   git commit -m "Full project ready for Vercel"
   git remote add origin https://github.com/YOUR_USERNAME/cargo-tracking.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Import repository
   - Use the `vercel.json` file I created in the root
   - Set all environment variables
   - Deploy

---

## 🔧 Required Environment Variables

### Backend:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Set to `production`
- `ALLOWED_ORIGINS` - Your frontend URL(s), comma-separated

### Frontend:
- `VITE_API_URL` - Your backend API URL (e.g., `https://backend.vercel.app/api`)

---

## ✅ Post-Deployment Checklist

- [ ] Backend health check works: `https://your-backend.vercel.app/api/health`
- [ ] Frontend loads correctly
- [ ] User search works (search by first 4 digits of phone)
- [ ] Admin login works
- [ ] CORS is configured correctly
- [ ] MongoDB connection is working

---

## 🐛 Troubleshooting

**Backend not working?**
- Check environment variables are set correctly
- Check MongoDB Atlas IP whitelist (allow all IPs: `0.0.0.0/0`)
- Check Vercel function logs

**Frontend can't connect to backend?**
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Check browser console for errors

**Build errors?**
- Make sure all dependencies are in `package.json`
- Check Node.js version (Vercel uses 18.x by default)

---

## 📚 Additional Resources

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Full deployment guide: See `DEPLOYMENT_GUIDE.md`

