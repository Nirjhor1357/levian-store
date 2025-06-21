const Category = require('../models/Category');

exports.getAll = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.create = async (req, res) => {
  const category = await Category.create({ name: req.body.name, image: req.body.image });
  res.json(category);
};

exports.update = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
};

exports.remove = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
