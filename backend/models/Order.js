const mg = require('mongoose');

const orderSchema = new mg.Schema(
  {
    user: {
      type: mg.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        shade: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mg.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
      default: 'MockCard',
    },
    paymentResult: {
      status: { type: String, default: 'mock_success' },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: true,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mg.model('Order', orderSchema);

module.exports = Order;