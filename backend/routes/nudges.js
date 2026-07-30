const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/db');

// @route   GET api/nudges
// @desc    Get all active nudges
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [nudges] = await pool.query('SELECT * FROM nudges WHERE user_id = ? AND is_dismissed = false ORDER BY created_at DESC', [userId]);
    res.json(nudges);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/nudges/:id
// @desc    Dismiss a nudge
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const nudgeId = req.params.id;
    await pool.query('UPDATE nudges SET is_dismissed = true WHERE id = ? AND user_id = ?', [nudgeId, userId]);
    res.json({ message: 'Nudge dismissed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
