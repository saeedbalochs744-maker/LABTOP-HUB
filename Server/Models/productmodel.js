const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Gaming", "Student", "Business"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    specs: {
      cpu: {
        type: String,
        default: "",
      },

      ram: {
        type: String,
        default: "",
      },

      storage: {
        type: String,
        default: "",
      },

      gpu: {
        type: String,
        default: "",
      },

      screen: {
        type: String,
        default: "",
      },
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;