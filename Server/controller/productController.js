const Product = require("../Models/productmodel");

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, brand, category, price } = req.body;

    if (!name || !brand || !category || price === undefined) {
      return res.status(400).json({
        message: "name, brand, category and price are required",
      });
    }

    const product = await Product.create({
      ...req.body,
      createdBy: req.userId || null,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/products?category=Gaming&search=asus
const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const products = await Product.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/products/mine
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      createdBy: req.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Invalid product id",
    });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (
      product.createdBy &&
      product.createdBy.toString() !== req.userId
    ) {
      return res.status(403).json({
        message: "You can only edit your own products",
      });
    }

    delete req.body.createdBy;

    Object.assign(product, req.body);

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (
      product.createdBy &&
      product.createdBy.toString() !== req.userId
    ) {
      return res.status(403).json({
        message: "You can only delete your own products",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CommonJS exports
module.exports = {
  createProduct,
  getProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};