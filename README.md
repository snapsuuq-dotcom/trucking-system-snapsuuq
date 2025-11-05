# Snapsuuq Cargo Tracking System

A full-stack cargo tracking system with admin panel and public search portal.

## Features

- 📦 Cargo management (CRUD operations)
- 🔍 Public search by first 4 digits of phone number
- 👤 Admin authentication
- 📊 Dashboard with statistics
- 🏷️ Category management
- 📅 Estimated arrival dates
- 🚚 Multiple truck numbers per cargo

## Tech Stack

**Frontend:**
- React 18
- Vite
- TailwindCSS
- React Router

**Backend:**
- Node.js
- Express
- MongoDB (Atlas)
- JWT Authentication

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Create .env file with your MongoDB URI
npm start
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## Deployment

See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for step-by-step Vercel deployment instructions.

Or see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment guide.

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
trucking-web-main/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── pages/       # React pages
│   │   ├── components/  # React components
│   │   ├── utils/       # Utilities (API, etc.)
│   │   └── App.jsx      # Main app component
│   └── package.json
└── README.md
```

## License

ISC

