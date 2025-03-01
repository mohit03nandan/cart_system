const express = require("express");
const { Cart, Product } = require("../models/schema"); // Import models
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.userId = decoded.userId; // Attach user ID to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Add Product to Cart
router.post("/cart/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      // Check if product already in cart
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Remove Product from Cart
router.delete("/cart/remove", verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Remove the product from cart
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// View Cart
router.get("/cart", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    // Calculate total price and discount
    let totalPrice = 0;
    let totalDiscount = 0;

    cart.products.forEach(item => {
      totalPrice += item.productId.price * item.quantity;
      totalDiscount += (item.productId.price * item.productId.discount * item.quantity) / 100;
    });

    res.status(200).json({ cart, totalPrice, discountApplied: totalDiscount });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
