const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const auth = require('../middleware/auth');
const pool = require('../config/db');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @route   POST api/copilot/chat
// @desc    Chat with AI Copilot
// @access  Private
router.post('/chat', auth, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    // Fetch context
    const [transactions] = await pool.query('SELECT * FROM transactions WHERE user_id = ? ORDER BY transaction_date DESC LIMIT 30', [userId]);
    const [goals] = await pool.query('SELECT * FROM savings_goals WHERE user_id = ?', [userId]);
    const [stocks] = await pool.query('SELECT * FROM stocks WHERE user_id = ?', [userId]);
    
    // Save user message
    await pool.query('INSERT INTO copilot_messages (user_id, role, content) VALUES (?, ?, ?)', [userId, 'user', message]);

    const context = JSON.stringify({
      transactions,
      goals,
      stocks
    });

    try {
      let botResponse = "";
      if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('your_openai')) {
          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: `You are FinNudge AI copilot. Answer only about this user's finances. User data: ${context}. Respond in 2-3 sentences, specific to rupees.` },
              { role: "user", content: message }
            ],
          });
          botResponse = completion.choices[0].message.content;
      } else {
         botResponse = "I see your latest transactions. (This is a simulated AI response. Please update your .env file with a valid OpenAI API key for real AI insights).";
      }
      
      // Save bot response
      await pool.query('INSERT INTO copilot_messages (user_id, role, content) VALUES (?, ?, ?)', [userId, 'assistant', botResponse]);

      res.json({ message: botResponse });
    } catch(aiErr) {
        console.error("OpenAI Error:", aiErr);
        res.status(502).json({ message: "Error communicating with AI service." });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
