const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Seeds, Pesticides, Fertilizers, others
  price: { type: Number, required: true },
  description: { type: String, required: true },
  unit: { type: String, default: 'unit' }, // e.g., kg, bag, packet, liter
  image: { type: String, required: true }, // Base64 or URL
  stock: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
