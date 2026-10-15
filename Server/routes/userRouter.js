
const express = require("express");

const {
  signUp,
  signIn,
  getProfile,
  protect,
} = require("../controller/userController");

const router = express.Router();

// Create account
router.post("/", signUp);

// Sign in
router.post("/signin", signIn);

// User profile
router.get("/profile", protect, getProfile);

module.exports = router;
