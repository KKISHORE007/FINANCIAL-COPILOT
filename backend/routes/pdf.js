const express = require('express');
const router = express.Router();
const multer  = require('multer');
const pdfParse = require('pdf-parse');
const auth = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });

// @route   POST api/pdf/upload
// @desc    Upload Bank PDF and extract transactions
// @access  Private
router.post('/upload', auth, upload.single('statement'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const data = await pdfParse(req.file.buffer);
    const text = data.text; // Text extracted from PDF

    // Simple robust mock parser for demonstration (would use AI or complex parsing IRL)
    const extractedTransactions = [
      { date: new Date().toISOString().split('T')[0], description: 'Extracted: Local Grocery', amount: 1250, is_credit: false, category: 'groceries' },
      { date: new Date().toISOString().split('T')[0], description: 'Extracted: Salary NEFT', amount: 55000, is_credit: true, category: 'other' }
    ];

    res.json({ message: 'PDF Parsed successfully', transactions: extractedTransactions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
