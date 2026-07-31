# FinNudge — AI Household Budget Co-Pilot

FinNudge is a full-stack personal/household finance web app that helps users track spending, manage savings goals, monitor loans and investments, and get proactive "nudges" about their money — all backed by an AI copilot chat that answers questions using the user's real financial data.

## Features

- **Authentication** — JWT-based signup/login with hashed passwords (bcrypt)
- **Dashboard** — At-a-glance summary of income, spending, and financial health
- **Transactions** — Add, view, and delete income/expense entries
- **Savings Goals** — Create and track progress toward savings targets
- **Loans & Fixed Deposits** — Track active loans and FDs
- **Subscriptions** — Monitor recurring subscriptions
- **Stocks** — Track holdings with live price lookups
- **Nudges** — System-generated alerts/reminders about spending habits
- **AI Copilot Chat** — Ask natural-language questions about your finances; responses are grounded in your actual transactions, goals, and stock data (in ₹) via the OpenAI API
- **Bank Statement Upload** — Upload a PDF statement for parsing (`pdf-parse`)
- **Household Support** — Group users under a shared household

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS 4
- React Router
- Chart.js (`react-chartjs-2`) for visualizations
- Axios, Lucide icons

**Backend**
- Node.js + Express 5
- MySQL (`mysql2`)
- JWT auth (`jsonwebtoken`) + `bcryptjs`
- OpenAI API for the AI copilot
- `multer` + `pdf-parse` for statement uploads

## Project Structure

```
FINANCIAL-COPILOT/
├── backend/
│   ├── config/db.js          # MySQL connection pool
│   ├── middleware/auth.js    # JWT auth middleware
│   ├── routes/
│   │   ├── auth.js           # Register / login
│   │   ├── transactions.js   # Income & expenses
│   │   ├── dashboard.js      # Summary data
│   │   ├── nudges.js         # Spending nudges
│   │   ├── stocks.js         # Holdings & prices
│   │   ├── subscriptions.js  # Recurring subscriptions
│   │   ├── loans.js          # Loan tracking
│   │   ├── deposits.js       # Fixed deposits
│   │   ├── goals.js          # Savings goals
│   │   ├── copilot.js        # AI chat endpoint
│   │   └── pdf.js            # Bank statement upload/parsing
│   └── server.js
├── frontend/
│   └── src/
│       ├── pages/            # LandingPage, AuthPage, DashboardPage, CopilotPage
│       ├── context/
│       └── utils/
├── finnudge_schema.sql        # Database schema
└── finnudge_seed.sql          # Sample seed data
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL server

### 1. Clone the repo
```bash
git clone https://github.com/KKISHORE007/FINANCIAL-COPILOT.git
cd FINANCIAL-COPILOT
```

### 2. Set up the database
```bash
mysql -u root -p < finnudge_schema.sql
mysql -u root -p < finnudge_seed.sql   # optional sample data
```

### 3. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
DATABASE_URL=mysql://<user>:<password>@localhost:3306/finnudge
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

Start the server:
```bash
node server.js
```

### 4. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

The frontend runs on Vite's default dev server (typically `http://localhost:5173`) and the API on `http://localhost:5000`.

## API Overview

| Route | Description |
|---|---|
| `POST /api/auth/register` | Create a new user |
| `POST /api/auth/login` | Log in and receive a JWT |
| `GET/POST/DELETE /api/transactions` | Manage transactions |
| `GET /api/dashboard/summary` | Financial summary for dashboard |
| `GET/PUT /api/nudges` | View / update nudges |
| `GET/POST /api/stocks`, `GET /api/stocks/prices` | Manage stock holdings & prices |
| `GET/POST/PUT /api/subscriptions` | Manage subscriptions |
| `GET/POST /api/loans` | Manage loans |
| `GET/POST /api/deposits` | Manage fixed deposits |
| `GET/POST/PUT /api/goals` | Manage savings goals |
| `POST /api/copilot/chat` | Chat with the AI copilot |
| `POST /api/pdf/upload` | Upload & parse a bank statement PDF |

All routes except `/api/auth/*` require a valid JWT (`Authorization` header).

## License

No license specified yet — add one (e.g., MIT) if you intend this to be open source.
