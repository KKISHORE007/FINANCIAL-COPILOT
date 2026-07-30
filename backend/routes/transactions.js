const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const auth = require('../middleware/auth');
const pool = require('../config/db');

// Duplicate detection: fingerprint = MD5(amount + date + first3WordsOfDescription)
function generateFingerprint(amount, date, description) {
  const first3Words = description ? description.split(' ').slice(0, 3).join(' ') : '';
  const dateStr = date ? new Date(date).toISOString().split('T')[0] : '';
  const str = `${amount}${dateStr}${first3Words}`;
  return crypto.createHash('md5').update(str).digest('hex');
}

// Nudge engine logic (if category spend > 40% of monthly budget in 1st half of month)
const checkNudgeEngine = async (userId, category, amount) => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  
  if (day <= 15) {
    const [users] = await pool.query('SELECT monthly_income FROM users WHERE id = ?', [userId]);
    const budget = users[0]?.monthly_income;
    if (budget) {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0];
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split('T')[0];
      
      const [spent] = await pool.query(
        'SELECT SUM(amount) as total FROM transactions WHERE user_id = ? AND category = ? AND is_credit = false AND transaction_date BETWEEN ? AND ?',
        [userId, category, startOfMonth, endOfMonth]
      );
      
      const totalSpent = Number(spent[0].total) || 0;
      
      if (totalSpent > (0.4 * budget)) {
         // Check if a nudge for this category already exists this month to avoid spam
         const [existingNudge] = await pool.query(
           'SELECT id FROM nudges WHERE user_id = ? AND type = ? AND created_at > ?',
           [userId, `overspend_${category}`, startOfMonth]
         );
         
         if (existingNudge.length === 0) {
           await pool.query(
             'INSERT INTO nudges (user_id, type, message) VALUES (?, ?, ?)',
             [userId, `overspend_${category}`, `Warning: You have spent over 40% of your total budget on ${category} within the first half of the month.`]
           );
         }
      }
    }
  }
};

// @route   POST api/transactions
// @desc    Add a transaction
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { amount, description, category, source, transaction_date, is_credit } = req.body;
    const userId = req.user.id;
    
    // Duplicate detection
    const fingerprint = generateFingerprint(amount, transaction_date, description);
    
    const [existing] = await pool.query('SELECT id FROM transactions WHERE fingerprint = ? AND user_id = ?', [fingerprint, userId]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Duplicate transaction detected' });
    }
    
    // transaction_date string might need to be explicitly parsed as YYYY-MM-DD
    const dateObj = new Date(transaction_date);
    const dateStr = dateObj.toISOString().split('T')[0];

    const [result] = await pool.query(
      'INSERT INTO transactions (user_id, amount, description, category, source, transaction_date, is_credit, fingerprint) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, amount, description, category, source, dateStr, is_credit || false, fingerprint]
    );
    
    if (!is_credit) {
       await checkNudgeEngine(userId, category, amount);
    }
    
    res.json({ message: 'Transaction added successfully', id: result.insertId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/transactions
// @desc    Get all transactions for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [transactions] = await pool.query('SELECT * FROM transactions WHERE user_id = ? ORDER BY transaction_date DESC', [userId]);
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const txId = req.params.id;
    await pool.query('DELETE FROM transactions WHERE id = ? AND user_id = ?', [txId, userId]);
    res.json({ message: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
