import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

//NORMAL USER
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json('404 - Product not found');
  }
});

//ADMIN USER
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'product removed' });
  } else {
    res.status(404).json('404 - Product not found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample category',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: ' sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
  } else {
    res.status(400);
    throw new Error('Product not found');
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

export {
  getProductById,
  getProducts,
  deleteProductById,
  createProduct,
  updateProduct,
};
