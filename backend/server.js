const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cosmeticsdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB error:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
console.log('Mounted /api/orders');

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));