const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get current user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price image');
    if (!cart) return res.status(200).json({ items: [] });
    res.json(cart);
  } catch (err) {
    console.error('[getCart] ', err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

// Add item to cart (or update quantity)
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, shade } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId is required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.quantity === 0) return res.status(400).json({ message: 'Product is out of stock' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existing = cart.items.find(i => i.product.toString() === productId && (i.shade || '') === (shade || ''));
    const requestedQuantity = Number(quantity);
    let newQuantity = requestedQuantity;

    if (existing) {
      newQuantity = existing.quantity + requestedQuantity;
    }

    // Check if requested quantity exceeds available stock
    if (newQuantity > product.quantity) {
      return res.status(400).json({ 
        message: `Product not available. Only ${product.quantity} items in stock.` 
      });
    }

    if (existing) {
      existing.quantity = newQuantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity: newQuantity,
        shade: shade || '',
      });
    }

    await cart.save();
    const populated = await cart.populate('items.product', 'name price image');
    res.status(201).json(populated);
  } catch (err) {
    console.error('[addToCart] ', err);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

// Remove single item by cart item id (or product id)
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // This is the cart item _id

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex(item => item._id.toString() === id);

    if (itemIndex > -1) {
      // If item is found, remove it from the array and save
      cart.items.splice(itemIndex, 1);
      await cart.save();
    }

    // Always populate the remaining items and return the full cart
    const populatedCart = await cart.populate('items.product', 'name price image');
    res.json(populatedCart);
  } catch (err) {
    console.error('[removeFromCart] ', err);
    res.status(500).json({ message: 'Failed to remove item' });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { items: [] } },
      { upsert: true, new: true }
    );
    res.json(cart || { items: [] });
  } catch (err) {
    console.error('[clearCart] ', err);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };