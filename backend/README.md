# 📦 Snapsuuq Cargo - Backend API

Express.js backend for the Snapsuuq Cargo Tracking System.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your settings
```

### 3. Create Admin Account
```bash
node scripts/create-admin.js
```

### 4. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## 🔐 Security

✅ No default credentials - admin must be created manually
✅ Passwords hashed with bcrypt
✅ JWT authentication
✅ CORS protection
✅ Environment variables for sensitive data

## 📚 API Endpoints

### Public
- `GET /api/health` - Health check
- `GET /api/cargo/track/:phoneNumber` - Track by phone
- `GET /api/cargo/track/truck/:truckNumber` - Track by truck

### Admin (Requires JWT)
- `POST /api/auth/login` - Login
- `POST /api/cargo` - Create cargo
- `GET /api/cargo` - List all cargo
- `PUT /api/cargo/:id` - Update cargo
- `DELETE /api/cargo/:id` - Delete cargo

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.

**Quick Deploy to Railway:**
1. Push to GitHub
2. Connect to Railway
3. Add environment variables
4. Deploy!

## 📝 Environment Variables

Required variables (see `.env.example`):
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `ALLOWED_ORIGINS` - Comma-separated allowed origins
- `NODE_ENV` - development or production
- `PORT` - Server port (default: 5000)

## 🛠️ Tech Stack

- **Express.js** - Web framework
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support
- **dotenv** - Environment variables

## 📄 License

ISC
