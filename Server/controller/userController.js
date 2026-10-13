
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/usermodel");

// Create JWT token
const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from .env");
  }

  return jwt.sign(
    { id: id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// POST /api/users/signup
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2 || cleanName.length > 80) {
      return res.status(400).json({
        message: "Name must contain 2 to 80 characters.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    if (
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({
        message: "Password must be at least 8 characters and no more than 72 UTF-8 bytes.",
      });
    }

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "This email is already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
    });

    const token = createToken(user._id);

    return res.status(201).json({
      message: "Account created successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This email is already registered.",
      });
    }

    console.error("Signup error:", error.message);

    return res.status(500).json({
      message: "Account creation failed. Please try again.",
    });
  }
};

// POST /api/users/signin
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: cleanEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      message: "Signed in successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signin error:", error.message);

    return res.status(500).json({
      message: "Sign-in failed. Please try again.",
    });
  }
};

// GET /api/users/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Profile error:", error.message);

    return res.status(500).json({
      message: "Could not load your profile.",
    });
  }
};

// Require a valid JWT
const protect = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Please sign in first.",
    });
  }

  try {
    const token = header.slice(7);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded.id) {
      return res.status(401).json({
        message: "Invalid authentication token.",
      });
    }

    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

// Optional authentication for guest-accessible routes
const optionalAuth = (req, res, next) => {
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer ")) {
    try {
      const token = header.slice(7);
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      if (decoded.id) {
        req.userId = decoded.id;
      }
    } catch (error) {
      // Continue as guest if token is invalid.
    }
  }

  return next();
};

module.exports = {
  signUp,
  signIn,
  getProfile,
  protect,
  optionalAuth,
};
