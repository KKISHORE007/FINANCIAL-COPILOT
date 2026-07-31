<div align="center">

# 💰 FinNudge
### Your AI-Powered Household Budget Co-Pilot

*Track spending. Hit savings goals. Get nudged before you overspend — all in one place.*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/AI-OpenAI%20API-412991?logo=openai&logoColor=white)](https://platform.openai.com/)
[![License](https://img.shields.io/badge/license-unspecified-lightgrey)](#-license)

</div>

---

## ✨ What is FinNudge?

FinNudge is a full-stack finance app built to help individuals and households stay on top of their money. It combines everyday budgeting tools — transactions, goals, loans, subscriptions, investments — with an **AI copilot** that answers questions about *your* finances in plain language (and in ₹), grounded in your real data.

<div align="center">

| 📊 Dashboard | 💬 AI Copilot | 🎯 Goals | 📄 Statement Upload |
|:---:|:---:|:---:|:---:|
| Real-time financial snapshot | Ask questions, get answers grounded in your data | Track savings targets | Auto-parse bank PDFs |

</div>

---

## 🚀 Features

- 🔐 **Secure Auth** — JWT sessions, bcrypt-hashed passwords
- 📈 **Dashboard** — Income, spending, and financial health at a glance
- 💸 **Transactions** — Log, view, and delete income & expenses
- 🎯 **Savings Goals** — Set targets and track progress
- 🏦 **Loans & Fixed Deposits** — Keep tabs on debt and savings instruments
- 🔁 **Subscriptions** — Never get surprised by a recurring charge again
- 📉 **Stocks** — Track holdings with live price lookups
- 🔔 **Smart Nudges** — Proactive alerts about spending habits
- 🤖 **AI Copilot Chat** — Natural-language Q&A powered by OpenAI, grounded in your transactions, goals & holdings
- 📎 **Bank Statement Upload** — Drop in a PDF, get it parsed automatically
- 👨‍👩‍👧 **Household Mode** — Share visibility across a household

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Frontend**
- ⚛️ React 19 + Vite
- 🎨 Tailwind CSS 4
- 🧭 React Router
- 📊 Chart.js (`react-chartjs-2`)
- 🔌 Axios · Lucide Icons

</td>
<td valign="top" width="50%">

**Backend**
- 🟢 Node.js + Express 5
- 🐬 MySQL (`mysql2`)
- 🔑 JWT + bcrypt
- 🧠 OpenAI API
- 📄 Multer + `pdf-parse`

</td>
</tr>
</table>

---

## 📁 Project Structure

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
├── finnudge_schema.sql       # Database schema
└── finnudge_seed.sql         # Sample seed data
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js v18+
- MySQL server

### 1️⃣ Clone the repo
```bash
git clone https://github.com/KKISHORE007/FINANCIAL-COPILOT.git
cd FINANCIAL-COPILOT
```

### 2️⃣ Set up the database
```bash
mysql -u root -p < finnudge_schema.sql
mysql -u root -p < finnudge_seed.sql   # optional sample data
```

### 3️⃣ Backend setup
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

Run it:
```bash
node server.js
```

### 4️⃣ Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

> Frontend → `http://localhost:5173` · Backend API → `http://localhost:5000`

---

## 📡 API Overview

| Method(s) | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create a new user |
| `POST` | `/api/auth/login` | Log in and receive a JWT |
| `GET` `POST` `DELETE` | `/api/transactions` | Manage transactions |
| `GET` | `/api/dashboard/summary` | Financial summary for dashboard |
| `GET` `PUT` | `/api/nudges` | View / update nudges |
| `GET` `POST` | `/api/stocks` | Manage stock holdings |
| `GET` | `/api/stocks/prices` | Live stock prices |
| `GET` `POST` `PUT` | `/api/subscriptions` | Manage subscriptions |
| `GET` `POST` | `/api/loans` | Manage loans |
| `GET` `POST` | `/api/deposits` | Manage fixed deposits |
| `GET` `POST` `PUT` | `/api/goals` | Manage savings goals |
| `POST` | `/api/copilot/chat` | Chat with the AI copilot |
| `POST` | `/api/pdf/upload` | Upload & parse a bank statement PDF |

🔒 All routes except `/api/auth/*` require a valid JWT in the `Authorization` header.

---

## 🗺️ Roadmap Ideas

- [ ] Add a proper license
- [ ] Deploy live demo (Vercel + Render)
- [ ] Add automated tests
- [ ] Multi-currency support

---

## 📄 License

No license specified yet — consider adding one (e.g., MIT) if this is meant to be open source.

<div align="center">

*Built with ❤️ by [KKISHORE007](https://github.com/KKISHORE007)*

</div>
