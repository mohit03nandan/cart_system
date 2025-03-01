const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true },
  password: { type: String, required: true }, // Store hashed password
});

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: [String], required: true },
  image: { type: String },
  description: { type: String },
  price: { type: Number, required: true }, // Add price for calculations
  discount: { type: Number, default: 0 }, // Discount percentage
});

// Cart Schema
const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

// Model Definitions
const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", ProductSchema);
const Cart = mongoose.model("Cart", CartSchema);

module.exports = { User, Product, Cart };
