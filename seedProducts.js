const mongoose = require("mongoose");
const { Product } = require("./models/schema"); // Adjust path if needed

mongoose.connect("mongodb+srv://Nandan:AdbjoCgtLj0t4DAp@cluster0.wowz9po.mongodb.net/locuscart?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedProducts = async () => {
  await Product.insertMany([
    {
      name: "Laptop",
      category: ["Electronics", "Computers"],
      image: "https://example.com/laptop.jpg",
      description: "High-performance laptop with Intel i7 processor.",
      price: 50000,
      discount: 10,
    },
    {
      name: "Smartphone",
      category: ["Electronics", "Mobile Phones"],
      image: "https://example.com/smartphone.jpg",
      description: "Latest 5G smartphone with 128GB storage.",
      price: 30000,
      discount: 5,
    },
    {
      name: "Headphones",
      category: ["Electronics", "Accessories"],
      image: "https://example.com/headphones.jpg",
      description: "Noise-canceling headphones with deep bass.",
      price: 5000,
      discount: 15,
    },
  ]);
  console.log("Products inserted successfully!");
  mongoose.connection.close();
};

seedProducts();
