const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/db');

// @route   GET api/subscriptions
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [subs] = await pool.query('SELECT * FROM subscriptions WHERE user_id = ?', [userId]);
    res.json(subs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/subscriptions
router.post('/', auth, async (req, res) => {
  try {
    const { name, monthly_cost, next_renewal, last_used } = req.body;
    const userId = req.user.id;
    const [result] = await pool.query(
      'INSERT INTO subscriptions (user_id, name, monthly_cost, next_renewal, last_used) VALUES (?, ?, ?, ?, ?)',
      [userId, name, monthly_cost, next_renewal, last_used]
    );
    res.json({ message: 'Subscription added', id: result.insertId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/subscriptions/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const { is_cancelled } = req.body;
    const userId = req.user.id;
    const subId = req.params.id;
    await pool.query('UPDATE subscriptions SET is_cancelled = ? WHERE id = ? AND user_id = ?', [is_cancelled, subId, userId]);
    res.json({ message: 'Subscription updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
