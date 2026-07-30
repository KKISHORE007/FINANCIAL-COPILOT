const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pool = require('../config/db');

// @route   GET api/stocks
// @desc    Get user stocks
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [stocks] = await pool.query('SELECT * FROM stocks WHERE user_id = ?', [userId]);
    res.json(stocks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/stocks
// @desc    Add a stock
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { stock_name, symbol, quantity, purchase_price } = req.body;
    const userId = req.user.id;

    // Using mock current price which is same as purchase for initial creation
    const [result] = await pool.query(
      'INSERT INTO stocks (user_id, stock_name, symbol, quantity, purchase_price, current_price) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, stock_name, symbol, quantity, purchase_price, purchase_price]
    );

    res.json({ message: 'Stock added', id: result.insertId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/stocks/prices
// @desc    Update stock prices (Mocking Alpha Vantage for Indian realistic stocks)
// @access  Private
router.get('/prices', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const [stocks] = await pool.query('SELECT * FROM stocks WHERE user_id = ?', [userId]);

    // Mock realistic pricing: add random -5% to +5% to current price
    for (let stock of stocks) {
      const change = (Math.random() * 0.1) - 0.05; 
      const newPrice = stock.current_price * (1 + change);
      await pool.query('UPDATE stocks SET current_price = ? WHERE id = ?', [newPrice, stock.id]);
    }

    const [updatedStocks] = await pool.query('SELECT * FROM stocks WHERE user_id = ?', [userId]);
    res.json(updatedStocks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
