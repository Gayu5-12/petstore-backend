const mongoose = require("mongoose");
const Product = require("../models/Product");
const { asyncHandler, errorResponse } = require("../utils/errors");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  return res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, 400, "Invalid product id");

  const product = await Product.findById(id);
  if (!product) return errorResponse(res, 404, "Product not found");

  return res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, image, stock } = req.body || {};

  if (!name || !description || !category || price === undefined || !image || stock === undefined) {
    return errorResponse(res, 400, "Missing required product fields");
  }

  const product = await Product.create({
    name: String(name).trim(),
    description: String(description),
    category: String(category).trim(),
    price: Number(price),
    image: String(image),
    stock: Number(stock),
  });

  return res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, 400, "Invalid product id");

  const updates = {};
  const allowed = ["name", "description", "category", "price", "image", "stock"];
  for (const key of allowed) {
    if (req.body && req.body[key] !== undefined) updates[key] = req.body[key];
  }

  if (updates.price !== undefined) updates.price = Number(updates.price);
  if (updates.stock !== undefined) updates.stock = Number(updates.stock);

  const product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!product) return errorResponse(res, 404, "Product not found");

  return res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse(res, 400, "Invalid product id");

  const product = await Product.findByIdAndDelete(id);
  if (!product) return errorResponse(res, 404, "Product not found");

  return res.json({ message: "Product deleted" });
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };

