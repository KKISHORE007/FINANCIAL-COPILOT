require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const dashboardRoutes = require('./routes/dashboard');
const nudgeRoutes = require('./routes/nudges');
const stockRoutes = require('./routes/stocks');
const subscriptionRoutes = require('./routes/subscriptions');
const loanRoutes = require('./routes/loans');
const depositRoutes = require('./routes/deposits');
const goalRoutes = require('./routes/goals');
const copilotRoutes = require('./routes/copilot');
const pdfRoutes = require('./routes/pdf');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/nudges', nudgeRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/deposits', depositRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/copilot', copilotRoutes);
app.use('/api/pdf', pdfRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
