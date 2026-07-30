const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/db');

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [deposits] = await pool.query('SELECT * FROM fixed_deposits WHERE user_id = ?', [userId]);
    res.json(deposits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { bank_name, principal, interest_rate, maturity_date } = req.body;
    const userId = req.user.id;
    const [result] = await pool.query(
      'INSERT INTO fixed_deposits (user_id, bank_name, principal, interest_rate, maturity_date) VALUES (?, ?, ?, ?, ?)',
      [userId, bank_name, principal, interest_rate, maturity_date]
    );
    res.json({ message: 'FD added', id: result.insertId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
