const express = require("express");

const {
  protect,
  optionalAuth,
} = require("../controller/userController");

const {
  createProduct,
  getProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const router = express.Router();

// GET /api/products
router.get("/", getProducts);

// GET /api/products/mine
// Keep this BEFORE /:id
router.get("/mine", protect, getMyProducts);

// GET /api/products/:id
router.get("/:id", getProductById);

// POST /api/products
// optionalAuth = works with or without login
router.post("/", optionalAuth, createProduct);

// PUT /api/products/:id
router.put("/:id", optionalAuth, updateProduct);

// DELETE /api/products/:id
router.delete("/:id", optionalAuth, deleteProduct);

module.exports = router;