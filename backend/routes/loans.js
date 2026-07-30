const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/db');

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [loans] = await pool.query('SELECT * FROM loans WHERE user_id = ?', [userId]);
    res.json(loans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { loan_type, outstanding_amount, interest_rate, monthly_emi, due_day } = req.body;
    const userId = req.user.id;
    const [result] = await pool.query(
      'INSERT INTO loans (user_id, loan_type, outstanding_amount, interest_rate, monthly_emi, due_day) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, loan_type, outstanding_amount, interest_rate, monthly_emi, due_day]
    );
    res.json({ message: 'Loan added', id: result.insertId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
