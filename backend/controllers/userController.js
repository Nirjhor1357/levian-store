const User = require('../models/User');

exports.getAll = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.getOne = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
};

exports.update = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  res.json(updated);
};

exports.remove = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
