# Snapsuuq Cargo Frontend - Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Best for React/Vite)

1. **Sign up at [Vercel.com](https://vercel.com/)**

2. **Deploy via GitHub** (Easiest):
   - Push your code to GitHub
   - Go to Vercel Dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite

3. **Configure Environment Variables**:
   - In Vercel Dashboard → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app/api`
   - ⚠️ Replace with your actual backend URL!

4. **Deploy Settings** (Auto-detected):
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Click "Deploy"** 🚀

### Option 2: Netlify

1. **Sign up at [Netlify.com](https://netlify.com/)**

2. **Deploy via GitHub**:
   - New Site from Git
   - Connect GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Environment Variables**:
   - Site Settings → Environment Variables
   - Add: `VITE_API_URL` = Your backend URL

### Option 3: Railway (Full-Stack)

1. **Deploy Frontend on Railway**:
   - New Project → Deploy from GitHub
   - Railway will detect Vite

2. **Add Environment Variables**:
   - Go to Variables tab
   - Add: `VITE_API_URL` = Your backend URL

---

## ⚙️ Before Deployment

### 1. Update `.env.production` File

```env
VITE_API_URL=https://your-actual-backend-url.railway.app/api
```

### 2. Test Production Build Locally

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### 3. Update Backend CORS Settings

Make sure your backend allows requests from your frontend domain!

In your backend `server.js`, update CORS:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app',
    // Add your production domain
  ],
  credentials: true
}));
```

---

## 📋 Deployment Checklist

- [ ] Backend is deployed and working
- [ ] `VITE_API_URL` points to deployed backend
- [ ] Test login with your admin account
- [ ] Test cargo tracking functionality
- [ ] Test all CRUD operations
- [ ] Check responsive design on mobile
- [ ] Update backend CORS to allow frontend domain

---

## 🌐 After Deployment

1. **Your frontend will be accessible at**:
   - Vercel: `https://your-app.vercel.app`
   - Netlify: `https://your-app.netlify.app`
   - Railway: `https://your-app.railway.app`

2. **Test Everything**:
   - Visit your deployed URL
   - Try tracking a cargo
   - Try admin login (with your secure credentials)
   - Test all features

3. **Custom Domain** (Optional):
   - Add your custom domain in deployment platform settings
   - Update DNS records as instructed

---

## 🐛 Troubleshooting

### API Connection Error
- ✅ Check `VITE_API_URL` is correct
- ✅ Ensure backend is running
- ✅ Check backend CORS settings
- ✅ Check browser console for errors

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Working
- ⚠️ Environment variables MUST start with `VITE_`
- ⚠️ Rebuild after changing env vars
- ⚠️ In deployment platform, redeploy after adding env vars

---

## 🔒 Security Notes

- ✅ Admin credentials removed from code
- ✅ API URL configured via environment variables
- ✅ Production build minified and optimized
- ✅ No sensitive data in client-side code

---

## 🎉 Quick Deploy Commands

### Deploy to Vercel via CLI
```bash
npm install -g vercel
cd frontend
vercel
```

### Deploy to Netlify via CLI
```bash
npm install -g netlify-cli
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

