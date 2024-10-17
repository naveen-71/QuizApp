const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Route to get C Quiz Questions
router.get('/c', (req, res) => {
  const query = 'SELECT * FROM c_questions';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching C quiz questions:', err);
      return res.status(500).send('Server error');
    }
    res.json(results.map(row => ({
      question: row.question,
      options: [row.option1, row.option2, row.option3, row.option4],
      correct_option: row.correct_option
    })));
  });
});

// Route to get Python Quiz Questions
router.get('/python', (req, res) => {
  const query = 'SELECT * FROM python_questions';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching Python quiz questions:', err);
      return res.status(500).send('Server error');
    }
    res.json(results.map(row => ({
      question: row.question,
      options: [row.option1, row.option2, row.option3, row.option4],
      correct_option: row.correct_option
    })));
  });
});

// Route to get Java Quiz Questions
router.get('/java', (req, res) => {
  const query = 'SELECT * FROM java_questions';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching Java quiz questions:', err);
      return res.status(500).send('Server error');
    }
    res.json(results.map(row => ({
      question: row.question,
      options: [row.option1, row.option2, row.option3, row.option4],
      correct_option: row.correct_option
    })));
  });
});

module.exports = router; // Export the router
