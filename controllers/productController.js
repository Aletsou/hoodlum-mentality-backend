// controllers/productController.js
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  let products = await Product.find({});

  // If no products are found, return dummy products for testing
  if (products.length === 0) {
    const dummyProducts = [
      {
        _id: 'dummy1',
        name: 'Hoodlum T-Shirt',
        price: 19.99,
        image: '/images/1.png', // Ensure you have an image at this path or use a URL
        description: 'A stylish T-shirt with the Hoodlum Mentality logo.',
        brand: 'Hoodlum',
        category: 'Apparel',
        countInStock: 15,
        numReviews: 0,
      },
      {
        _id: 'dummy2',
        name: 'Hoodlum Hoodie',
        price: 39.99,
        image: '/images/2.png', // Ensure this image exists or use a URL
        description: 'A cozy hoodie with a bold design.',
        brand: 'Hoodlum',
        category: 'Apparel',
        countInStock: 10,
        numReviews: 0,
      },
      {
        _id: 'dummy3',
        name: 'Hoodlum Cap',
        price: 14.99,
        image: '/images/3.png', // Ensure this image exists or use a URL
        description: 'A cool cap to complete your look.',
        brand: 'Hoodlum',
        category: 'Accessories',
        countInStock: 20,
        numReviews: 0,
      },
    ];
    return res.json(dummyProducts);
  }

  // Otherwise, return actual products from the database
  res.json(products);
});

// @desc    Fetch single product
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

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = { getProducts, getProductById, createProduct, updateProduct };

