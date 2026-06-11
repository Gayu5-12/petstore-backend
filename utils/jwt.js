const jwt = require("jsonwebtoken");

// Requirement: JWT expiry = 14 days
const JWT_EXPIRES_IN = "14d";

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { signToken, verifyToken };

