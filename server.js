const express = require("express");
const cors = require("cors");
const connect = require("./config/db"); // Database connection
const authRoutes = require("./routes/authRoutes"); // Authentication routes
const cartRoutes = require("./routes/cartRoutes"); // Cart routes

const app = express();

// Connect to MongoDB
connect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Health Check Route
app.get("/api/health", (req, res) => {
    res.send(`Backend server is active | Status: Active | Time: ${new Date()}`);
});

// API Routes
app.use("/api/auth", authRoutes); // User authentication (signup, login)
app.use("/api/cart", cartRoutes); // Cart operations (add, remove, view)

// Error Handling Middleware
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found! Please check the API endpoint." });
});

// Start Server
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});
