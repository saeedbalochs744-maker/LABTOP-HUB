const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CR7 SUUU API running",
  });
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Something went wrong",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});