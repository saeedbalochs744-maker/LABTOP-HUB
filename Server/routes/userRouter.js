const express = require("express");

const {
  signUp,
  signIn,
  getProfile,
  protect,
} = require("../controller/userController");

const router = express.Router();

// POST /api/users/signup
router.post("/signup", signUp);

// POST /api/users/signin
router.post("/signin", signIn);

// GET /api/users/profile
router.get("/profile", protect, getProfile);

module.exports = router;