# 📦 Snapsuuq Cargo - Frontend

React + Vite frontend for the Snapsuuq Cargo Tracking System.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

### 3. Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

## 🎨 Features

### Public Interface
- Track cargo by phone number or truck number
- Real-time status updates
- Mobile-responsive design
- Beautiful modern UI

### Admin Dashboard
- Secure login
- Add/Edit/Delete cargo
- Dashboard with statistics
- Customer management
- Multiple truck numbers per shipment

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.

**Quick Deploy to Vercel:**
1. Push to GitHub
2. Import project to Vercel
3. Add `VITE_API_URL` environment variable
4. Deploy!

## 📝 Environment Variables

For production (`.env.production`):
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

For development, the app uses `http://localhost:5000/api` by default.

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Recharts** - Charts
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── components/      # Reusable components
├── context/        # Context providers (Auth)
├── pages/          # Page components
├── App.jsx         # Main app component
└── main.jsx        # Entry point
```

## 🎨 Styling

Built with Tailwind CSS for modern, responsive design.

## 📄 License

ISC
