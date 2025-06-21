// createAdmin.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Adjust path if your User.js is in a different directory

async function main() {
  await mongoose.connect("mongodb://localhost:27017/ecommerce");

  // EDIT THESE VALUES:
  const adminName = "Admin User";
  const adminEmail = "admin@example.com";
  const adminPassword = "supersecurepassword"; // Change to your desired password

  // Check if the user already exists
  let user = await User.findOne({ email: adminEmail });
  if (user) {
    if (!user.isAdmin) {
      user.isAdmin = true;
      await user.save();
      console.log("Existing user promoted to admin:", adminEmail);
    } else {
      console.log("Admin already exists:", adminEmail);
    }
  } else {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    user = await User.create({
      name: adminName,
      email: adminEmail,
      password: passwordHash,
      isAdmin: true,
    });
    console.log("New admin user created:", adminEmail);
  }

  mongoose.disconnect();
}

main();
