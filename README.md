# 🚀 Remote Jobs Platform

A modern full-stack web application for discovering remote job opportunities with advanced search, user authentication, and job management features.

## ✨ Features

- **Job Search & Filtering** - Search jobs by title, location, salary, experience level
- **User Authentication** - JWT-based login/signup with secure profiles
- **Job Bookmarking** - Save and manage favorite job listings
- **Salary Calculator** - Compare salaries across locations
- **Responsive Design** - Mobile-first, accessible UI

## 🛠️ Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui  
**Backend:** Node.js, Express.js, MongoDB, JWT Authentication  
**Tools:** React Query, React Router, Axios, Mongoose

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone <your-repository-url>
   cd remote-jobs-platform
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Create server/.env
   MONGODB_URI=mongodb://localhost:27017/remote-jobs
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

3. **Run Application**
   ```bash
   # Terminal 1: Backend
   cd server && node server.js
   
   # Terminal 2: Frontend
   npm run dev
   ```

4. **Access**
   - Frontend: `http://localhost:8081`
   - API: `http://localhost:5000`

## 📡 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile
- `POST /api/user/save-job` - Save job
- `GET /api/user/saved-jobs` - Get saved jobs

## 📦 Build & Deploy

```bash
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Code linting
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push branch (`git push origin feature/name`)
5. Open Pull Request
