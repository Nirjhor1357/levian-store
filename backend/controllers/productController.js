const Product = require('../models/Product');

exports.getAll = async (req, res) => {
  const products = await Product.find().populate('category');
  res.json(products);
};

exports.getOne = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
};

exports.create = async (req, res) => {
  const { name, price, category, description, countInStock } = req.body;
  const product = new Product({
    name,
    price,
    category,
    description,
    countInStock,
    image: req.file ? req.file.filename : null
  });
  await product.save();
  res.json(product);
};

exports.update = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
