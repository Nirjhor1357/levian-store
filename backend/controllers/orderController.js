const Order = require('../models/Order');

exports.create = async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
};

exports.getAll = async (req, res) => {
  const orders = await Order.find().populate('user').populate('orderItems.product');
  res.json(orders);
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate('orderItems.product');
  res.json(orders);
};

exports.update = async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.remove = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
