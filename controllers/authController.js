const User = require("../models/User");
const { signToken } = require("../utils/jwt");
const { asyncHandler, errorResponse } = require("../utils/errors");

// REGISTER
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return errorResponse(
      res,
      400,
      "Name, email and password are required"
    );
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    return errorResponse(
      res,
      409,
      "Email already registered"
    );
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: role === "admin" ? "admin" : "user",
  });

  res.status(201).json({
    message: "Account created successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// LOGIN
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  }).select("+password");

  if (!user) {
    return errorResponse(
      res,
      401,
      "Invalid email or password"
    );
  }

  const isMatch = await user.comparePassword(password);

console.log("Login Email:", email);
console.log("Entered Password:", password);
console.log("Password Match:", isMatch);

if (!isMatch) {
  return errorResponse(
    res,
    401,
    "Invalid email or password"
  );
}

  user.isLoggedIn = true;
  user.lastLogin = new Date();

  await user.save();

  const token = signToken({
    id: user._id,
    role: user.role,
  });

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// PROFILE
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return errorResponse(
      res,
      404,
      "User not found"
    );
  }

  res.json({ user });
});

// FORGOT PASSWORD
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    return res.status(404).json({
      message: "Email not found",
    });
  }

  res.status(200).json({
    message: "Email verified",
    userId: user._id,
  });
});

// RESET PASSWORD
const resetPassword = asyncHandler(async (req, res) => {
  const { userId, newPassword } = req.body;

  console.log(req.body);

  if (!userId || !newPassword) {
    return res.status(400).json({
      message: "User ID and password required",
    });
  }

  const user = await User.findById(userId).select("+password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.password = newPassword;

  await user.save();

  console.log(
    "Password updated successfully for:",
    user.email
  );

  res.status(200).json({
    message: "Password updated successfully",
  });
});

// LOGOUT
const logout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.isLoggedIn = false;
    await user.save();
  }

  res.json({
    message: "Logged out successfully",
  });
});

module.exports = {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
  logout,
};