const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllProductsForAdmin = async (req, res) => {
  try {
    const products = await Product.find({}, null, { limit: 0 }).sort({ name: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { shade } = req.query; // Get shade from query parameter
    const query = { category };
    if (shade) {
      query.shades = shade; // Filter products by shade
    }
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getShadesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    // Collect all unique shades
    const shades = [...new Set(products.flatMap(product => product.shades))];
    res.json(shades);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (quantity < 0) {
      return res.status(400).json({ message: 'Quantity cannot be negative' });
    }
    
    const product = await Product.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProducts, getProductById, getProductsByCategory, getShadesByCategory, updateProductQuantity, getAllProductsForAdmin };