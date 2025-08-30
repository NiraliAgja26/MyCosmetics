const User = require('../models/User');

const protect = async (req, res, next) => {
  const userId = req.header('userId'); // Get userId from request header
  if (!userId) {
    return res.status(401).json({ message: 'Please log in to access this feature' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user; // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid user ID' });
  }
};

module.exports = { protect };