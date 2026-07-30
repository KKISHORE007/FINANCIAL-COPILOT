const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/db');

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [goals] = await pool.query('SELECT * FROM savings_goals WHERE user_id = ?', [userId]);
    res.json(goals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { goal_name, target_amount, deadline } = req.body;
    const userId = req.user.id;
    const [result] = await pool.query(
      'INSERT INTO savings_goals (user_id, goal_name, target_amount, current_saved, deadline) VALUES (?, ?, ?, ?, ?)',
      [userId, goal_name, target_amount, 0, deadline]
    );
    res.json({ message: 'Goal added', id: result.insertId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { current_saved } = req.body;
    const goalId = req.params.id;
    const userId = req.user.id;
    await pool.query('UPDATE savings_goals SET current_saved = ? WHERE id = ? AND user_id = ?', [current_saved, goalId, userId]);
    res.json({ message: 'Goal updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
