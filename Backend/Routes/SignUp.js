// routes/signup.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/User');

// Register a new user, including an "isAdmin" field
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    // Check if the email or username is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already taken' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with isAdmin option
    const newUser = new User({ username, email, password: hashedPassword, isAdmin });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
