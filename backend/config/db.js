// This file handles the connection to MongoDB database
const mg = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to local MongoDB instance
    await mg.connect('mongodb://127.0.0.1:27017/cosmeticsdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;