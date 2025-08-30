const User = require('../models/User');

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({ email, password });
    await user.save();
    res.json({ userId: user._id, email: user.email, message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.json({ userId: user._id, email: user.email, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };