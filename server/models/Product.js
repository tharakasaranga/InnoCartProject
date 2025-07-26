const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String, // This will store the path or URL to the image
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    brand: {
      type: String,
      required: false, // Make optional if not always present
    },
    rating: {
      type: Number,
      required: false, // Make optional if not always present
      default: 0,
    },
    popularity: {
      type: Number,
      required: false, // Make optional if not always present
      default: 0,
    },
    // You can add more fields here based on your needs (e.g., reviews, sizes, colors)
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;