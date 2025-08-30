const mg = require('mongoose');

const productSchema = new mg.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  shades: [{ type: String }],
  quantity: { type: Number, default: 10 }
});

module.exports = mg.model('Product', productSchema);