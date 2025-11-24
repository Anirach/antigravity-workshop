# Personal Expense Tracker

A full-stack expense tracking application built with React, Express, Prisma, and SQLite.

## Architecture

- **Frontend**: React + Vite (deployed on Vercel)
- **Backend**: Express + Prisma + SQLite (deployed on Railway)
- **Database**: SQLite with Prisma ORM

## Local Development

### Backend Setup

```bash
cd server
npm install
npx prisma migrate dev
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Deployment

### 1. Deploy Backend to Railway

1. **Create Railway Account**: Sign up at https://railway.app
2. **Create New Project**: Click "New Project" → "Deploy from GitHub repo"
3. **Select Repository**: Choose this repository
4. **Configure Service**:
   - Set root directory to `/server`
   - Railway will auto-detect Node.js
5. **Add Environment Variables**:
   - `DATABASE_URL`: `file:./dev.db` (Railway provides persistent storage)
6. **Deploy**: Railway will automatically build and deploy
7. **Get URL**: Copy the generated Railway URL (e.g., `https://your-app.railway.app`)

### 2. Deploy Frontend to Vercel

1. **Create Vercel Account**: Sign up at https://vercel.com
2. **Import Project**: Click "Add New" → "Project"
3. **Select Repository**: Choose this repository
4. **Configure Project**:
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Add Environment Variable**:
   - Name: `VITE_API_URL`
   - Value: `https://your-app.railway.app/api` (use your Railway URL)
6. **Deploy**: Vercel will build and deploy automatically

### 3. Verify Deployment

1. Open your Vercel frontend URL
2. Add a test expense
3. Verify it appears in the list
4. Refresh the page to confirm persistence

## Environment Variables

### Backend (.env)
```
DATABASE_URL="file:./dev.db"
PORT=3000
```

### Frontend (.env.local)
```
VITE_API_URL=https://your-backend.railway.app/api
```

## Tech Stack

- **Frontend**: React 19, Vite 7
- **Backend**: Node.js, Express 5
- **Database**: SQLite, Prisma 5
- **Deployment**: Vercel (Frontend), Railway (Backend)

## Features

- ✅ Add expenses with description, amount, and category
- ✅ View all expenses in chronological order
- ✅ Persistent storage with SQLite
- ✅ Responsive design
- ✅ Separate backend/frontend deployment
