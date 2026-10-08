const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/usermodel");

// Create JWT token
const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// POST /api/users/signup
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "Account created",
      token: createToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// POST /api/users/signin
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "Signed in",
      token: createToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/users/profile
// Protected route
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Requires a valid token
const protect = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  try {
    const token = header.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// Works with or without a token
const optionalAuth = (req, res, next) => {
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer ")) {
    try {
      const token = header.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.userId = decoded.id;
    } catch (error) {
      // Invalid token: continue as guest
    }
  }

  next();
};

// CommonJS exports
module.exports = {
  signUp,
  signIn,
  getProfile,
  protect,
  optionalAuth,
};