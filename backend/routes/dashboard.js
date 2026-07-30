const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/db');

// @route   GET api/dashboard/summary
// @desc    Get summary for current month
// @access  Private
router.get('/summary', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0];
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split('T')[0];

    // Get user income
    const [users] = await pool.query('SELECT monthly_income FROM users WHERE id = ?', [userId]);
    const income = Number(users[0]?.monthly_income) || 0;

    // Get total spent this month
    const [spentRes] = await pool.query(
      'SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND is_credit = false AND transaction_date BETWEEN ? AND ?',
      [userId, startOfMonth, endOfMonth]
    );
    const spent = Number(spentRes[0]?.total) || 0;

    // Simplistic saved calculation
    const saved = income - spent > 0 ? income - spent : 0;
    const balance = income - spent;

    res.json({
      income,
      spent,
      saved,
      balance,
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear()
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
