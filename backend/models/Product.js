const { Schema, model } = require('mongoose');

const productSchema = Schema({
  title: {
    required: true,
    type: String,
  },
  price: {
    actualPrice: Number,
    currentPrice: Number,
  },
  isFeatured: { type: Boolean, default: false },
  rating: {
    ratings: [{ type: Number, min: 0, max: 5 }],
  },
  category: { type: String },
  description: {
    short: { type: String, required: true },
    long: { type: String, required: true },
  },
  images: [String],
});

module.exports = product = model('product', productSchema);
