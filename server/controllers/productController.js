const Product = require('../models/Product');
const asyncHandler = require('express-async-handler'); // For handling async errors

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // Case-insensitive
        },
      }
    : {};

  const category = req.query.category
    ? {
        category: {
          $regex: req.query.category,
          $options: 'i',
        },
      }
    : {};

  let query = {};
  if (keyword && Object.keys(keyword).length > 0) {
    query = { ...query, ...keyword };
  }
  if (category && Object.keys(category).length > 0) {
    query = { ...query, ...category };
  }

  const products = await Product.find(query);
  res.json(products);
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product (for initial seeding or admin)
// @route   POST /api/products
// @access  Private/Admin (you'll add auth later)
const createProduct = asyncHandler(async (req, res) => {
  // Example dummy data for creation, you'd get this from req.body in a real scenario
  const { name, price, description, image, category, countInStock, brand, rating, popularity } = req.body;

  const product = new Product({
    name: name || 'Sample Name',
    price: price || 0,
    description: description || 'Sample description',
    image: image || '/images/sample.jpg', // Placeholder image
    category: category || 'Electronics',
    countInStock: countInStock || 0,
    brand: brand || 'Sample Brand',
    rating: rating || 0,
    popularity: popularity || 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});


// Add other CRUD operations as needed (updateProduct, deleteProduct)

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};