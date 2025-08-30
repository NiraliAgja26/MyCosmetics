const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getReviews, addReview } = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getReviews);
router.post('/', protect, addReview);

module.exports = router;