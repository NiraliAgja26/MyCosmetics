const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addOrderItems, getMyOrders } = require('../controllers/orderController');

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);

module.exports = router;