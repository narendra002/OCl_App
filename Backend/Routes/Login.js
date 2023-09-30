// routes/login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config(); // Load environment variables


const secretKey = process.env.SECRET;// Replace with a strong secret key

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Include the "isAdmin" status and "userId" in the JWT payload
    const payload = {
      userId: user._id,     // Include the "userId" in the payload
     
    };

    // Create and send a JSON Web Token (JWT) for authentication
    const token_id = jwt.sign(payload, secretKey, { expiresIn: '7h' });
    
    // Send the "userId" in the response
    res.status(200).json({ userId: user._id ,token:token_id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
