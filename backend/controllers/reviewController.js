const Review = require('../models/Review');

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'email');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addReview = async (req, res) => {
  const { text } = req.body;
  try {
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Review text is required' });
    }
    const review = new Review({
      user: req.user._id,
      text: text.trim()
    });
    await review.save();
    await review.populate('user', 'email');
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getReviews, addReview };