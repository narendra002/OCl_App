const jwt = require('jsonwebtoken');
const secretKey = "JayShreeRam"; // Replace with your secret key

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Attach the decoded user ID to the request object for future use
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
