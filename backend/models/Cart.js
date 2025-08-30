const mg = require('mongoose');

const cartSchema = new mg.Schema({
  user: { type: mg.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mg.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      shade: { type: String, required: true }
    }
  ]
});

module.exports = mg.model('Cart', cartSchema);