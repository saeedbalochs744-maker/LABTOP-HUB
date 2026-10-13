
const mongoose = require("mongoose");
const Product = require("../Models/productmodel");

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, brand, category, price } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof brand !== "string" ||
      !brand.trim() ||
      typeof category !== "string" ||
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return res.status(400).json({
        message: "Name, brand, category and price are required.",
      });
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        message: "Price must be a valid non-negative number.",
      });
    }

    const product = await Product.create({
      ...req.body,
      name: name.trim(),
      brand: brand.trim(),
      category: category.trim(),
      price: numericPrice,
      createdBy: req.userId || null,
    });

    return res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("Create product error:", error.message);

    return res.status(500).json({
      message: "Could not create product.",
    });
  }
};

// GET /api/products?category=Gaming&search=asus
const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search && search.trim()) {
      const escapedSearch = search.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.$or = [
        { name: { $regex: escapedSearch, $options: "i" } },
        { brand: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    const products = await Product.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Get products error:", error.message);

    return res.status(500).json({
      message: "Could not load products.",
    });
  }
};

// GET /api/products/mine
const getMyProducts = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Please sign in first.",
      });
    }

    const products = await Product.find({
      createdBy: req.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Get my products error:", error.message);

    return res.status(500).json({
      message: "Could not load your products.",
    });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product id.",
      });
    }

    const product = await Product.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Get product error:", error.message);

    return res.status(500).json({
      message: "Could not load product.",
    });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Please sign in first.",
      });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product id.",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    if (
      !product.createdBy ||
      product.createdBy.toString() !== req.userId.toString()
    ) {
      return res.status(403).json({
        message: "You can only edit products you own.",
      });
    }

    // Never allow the client to change ownership.
    const allowedFields = [
      "name",
      "brand",
      "category",
      "price",
      "description",
      "image",
      "specs",
      "stock",
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    }

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("Update product error:", error.message);

    return res.status(500).json({
      message: "Could not update product.",
    });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Please sign in first.",
      });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product id.",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    if (
      !product.createdBy ||
      product.createdBy.toString() !== req.userId.toString()
    ) {
      return res.status(403).json({
        message: "You can only delete products you own.",
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Delete product error:", error.message);

    return res.status(500).json({
      message: "Could not delete product.",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
