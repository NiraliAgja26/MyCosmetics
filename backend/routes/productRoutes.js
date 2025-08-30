const express = require('express');
const { getProducts, getProductById, getProductsByCategory, getShadesByCategory, updateProductQuantity, getAllProductsForAdmin } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/admin/all', getAllProductsForAdmin);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);
router.get('/category/:category/shades', getShadesByCategory);
router.put('/:id/quantity', updateProductQuantity);

module.exports = router;