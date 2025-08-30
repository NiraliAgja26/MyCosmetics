const express = require('express');
// require middleware robustly (accept authMiddleware, protect, default export, or the module itself)
const middleware = require('../middleware/authMiddleware');
const authMiddleware = middleware.authMiddleware || middleware.protect || middleware.default || middleware;

const { getCart, addToCart, removeFromCart, clearCart } = require('../controllers/cartController');

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.delete('/:id', authMiddleware, removeFromCart);
router.delete('/', authMiddleware, clearCart);

module.exports = router;