const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const addOrderItems = async (req, res) => {
  try {
    const { orderItems } = req.body;

    // Auth sanity check
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Helpful debug logging (will show in server console)
    console.debug('[addOrderItems] user:', req.user._id);
    console.debug('[addOrderItems] orderItems:', JSON.stringify(orderItems, null, 2));

    // Get product details from DB to ensure data integrity (e.g., price)
    const productIds = orderItems
      .map(item => item.product)
      .filter(id => id);

    const productsFromDB = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(productsFromDB.map(p => [p._id.toString(), p]));

    // Check stock availability and prepare order items
    const finalOrderItems = [];
    for (const item of orderItems) {
      if (!item.product || !productMap.has(item.product.toString())) continue;
      
      const product = productMap.get(item.product.toString());
      if (product.quantity < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Only ${product.quantity} available.` 
        });
      }
      
      finalOrderItems.push({
        name: product.name,
        quantity: item.quantity,
        shade: item.shade,
        image: product.image,
        price: product.price,
        product: product._id,
      });
    }

    if (finalOrderItems.length === 0) {
      return res.status(400).json({ message: 'None of the items in your cart could be found.' });
    }

    // Decrease product quantities
    for (const item of finalOrderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { quantity: -item.quantity } }
      );
    }

    const calculatedTotalPrice = finalOrderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const order = new Order({
      orderItems: finalOrderItems,
      user: req.user._id,
      totalPrice: calculatedTotalPrice,
      isPaid: true, // Mock payment is always considered paid
      paidAt: Date.now(),
      paymentResult: { status: 'mock_success' },
    });

    const createdOrder = await order.save();

    await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('[addOrderItems] error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: `Validation Error: ${messages.join(', ')}` });
    }
    res.status(500).json({ message: error.message || 'An unexpected error occurred while creating the order.' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { addOrderItems, getMyOrders };