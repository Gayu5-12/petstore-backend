const { verifyToken } = require("../utils/jwt");
const User = require("../models/User");

async function protect(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-password -resetPasswordToken");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}

function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  return next();
}

module.exports = { protect, adminOnly };

