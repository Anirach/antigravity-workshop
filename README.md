# Personal Expense Tracker

A full-stack expense tracking application built with React, Express (Serverless), Prisma, and PostgreSQL.

## Architecture

- **Frontend**: React + Vite
- **Backend**: Vercel Serverless Functions
- **Database**: PostgreSQL (Vercel Postgres)
- **Deployment**: Vercel (Full Stack)

## Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or cloud)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Anirach/antigravity-workshop.git
cd antigravity-workshop
```

2. **Install dependencies**
```bash
# Install root dependencies (Prisma)
npm install

# Install client dependencies
cd client
npm install
cd ..
```

3. **Set up environment variables**
Create a `.env` file in the root:
```env
POSTGRES_PRISMA_URL="postgresql://user:password@localhost:5432/expense_tracker?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://user:password@localhost:5432/expense_tracker"
```

4. **Run database migrations**
```bash
npx prisma migrate dev
```

5. **Start the development servers**

Backend (serverless functions):
```bash
npm install -g vercel
vercel dev
```

Or run frontend separately:
```bash
cd client
npm run dev
```

## Deployment to Vercel

### 1. Create Vercel Account
Sign up at https://vercel.com

### 2. Create Vercel Postgres Database

1. Go to your Vercel dashboard
2. Click "Storage" → "Create Database"
3. Select "Postgres"
4. Choose a name and region
5. Click "Create"
6. Copy the connection strings (they'll be automatically added to your project)

### 3. Deploy the Application

#### Option A: Deploy via Vercel Dashboard

1. Click "Add New" → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `client/dist`
4. Connect your Postgres database (Vercel will auto-populate environment variables)
5. Click "Deploy"

#### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link to Postgres database
vercel link

# Deploy
vercel --prod
```

### 4. Run Database Migrations

After first deployment, run migrations:
```bash
vercel env pull .env.local
npx prisma migrate deploy
```

### 5. Verify Deployment

1. Open your Vercel deployment URL
2. Add a test expense
3. Verify it appears in the list
4. Refresh the page to confirm persistence

## Project Structure

```
.
├── api/                    # Vercel serverless functions
│   └── expenses.js        # Expense API endpoint
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API client
│   │   └── App.jsx       # Main app
│   └── package.json
├── prisma/               # Database schema and migrations
│   └── schema.prisma
├── package.json          # Root dependencies (Prisma)
├── vercel.json          # Vercel configuration
└── README.md
```

## Environment Variables

### Production (Vercel)
Set these in Vercel Dashboard → Settings → Environment Variables:

- `POSTGRES_PRISMA_URL`: Provided by Vercel Postgres (pooled connection)
- `POSTGRES_URL_NON_POOLING`: Provided by Vercel Postgres (direct connection)

### Local Development (.env)
```env
POSTGRES_PRISMA_URL="postgresql://user:password@localhost:5432/expense_tracker?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://user:password@localhost:5432/expense_tracker"
```

## Tech Stack

- **Frontend**: React 19, Vite 7
- **Backend**: Vercel Serverless Functions
- **Database**: PostgreSQL, Prisma 5
- **Deployment**: Vercel

## Features

- ✅ Add expenses with description, amount, and category
- ✅ View all expenses in chronological order
- ✅ Persistent storage with PostgreSQL
- ✅ Responsive design
- ✅ Serverless architecture
- ✅ Full-stack deployment on Vercel

## Database Schema

```prisma
model Expense {
  id          Int      @id @default(autoincrement())
  description String
  amount      Decimal
  category    String
  createdAt   DateTime @default(now())
}
```

## API Endpoints

- `GET /api/expenses` - Fetch all expenses
- `POST /api/expenses` - Create a new expense

## Troubleshooting

### Migrations fail on Vercel
Run migrations manually:
```bash
vercel env pull .env.local
npx prisma migrate deploy
```

### API returns 500 error
Check Vercel logs for database connection issues. Ensure environment variables are set correctly.

### Local development issues
Make sure PostgreSQL is running and connection strings in `.env` are correct.
