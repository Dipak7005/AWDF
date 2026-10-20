const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Authentication failed',
      details: ['Access denied. No token provided or invalid format.']
    });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret_key';
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Contains id, email, name
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Authentication failed',
        details: ['Token has expired. Please log in again.']
      });
    }
    return res.status(401).json({
      error: 'Authentication failed',
      details: ['Invalid authentication token.']
    });
  }
};

module.exports = auth;
