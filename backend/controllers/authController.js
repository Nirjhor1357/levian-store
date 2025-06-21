const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register controller
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already in use" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create new user (never allow isAdmin via register API)
    const user = await User.create({
      name,
      email,
      password: hashed,
      isAdmin: false,
    });

    // Return minimal info (never password)
    res.json({
      user: { id: user._id, email: user.email, isAdmin: user.isAdmin },
      message: "Registration successful",
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid credentials" });

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ error: "Invalid credentials" });

    // JWT token (include id, isAdmin, email)
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return token + minimal user info
    res.json({
      token,
      user: { id: user._id, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
