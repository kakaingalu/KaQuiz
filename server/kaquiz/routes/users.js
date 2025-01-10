const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Assuming you've moved the MySQL connection setup to a separate file

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);

  if (existingUser.length > 0) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Insert new user into the database
  const result = await db.query(
    'INSERT INTO users SET ?',
    {
      firstName,
      lastName,
      email,
      password: password // Note: You should hash the password before storing it
    }
  );

  // Check if the user was successfully inserted
  if (result.affectedRows === 0) {
    return res.status(500).json({ message: 'Failed to register user' });
  }

  res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
});

router.get('/users', async (req, res) => {
    try {
      const users = await db.query('SELECT * FROM users');
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Database error' });
    }
  });

module.exports = router;
