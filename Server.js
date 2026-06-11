const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const { getEnv } = require("./config/env");
const { connectDB } = require("./config/db");

const authRoutes = require("./routers/authRoutes");
const productRoutes = require("./routers/productRoutes");
const petRoutes = require("./routers/petRoutes");
const adminRoutes =require("./routers/adminRoutes");
const adoptionRoutes =require("./routers/adoptionRoutes");
const sellRoutes =require("./routers/sellRoutes");

const app = express();

const { port, mongoUri } = getEnv();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Pet Paws API is running 🚀",
  });
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    database: "connected",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/adoptions", adoptionRoutes);
app.use("/api/sells", sellRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

(async () => {
  try {
    await connectDB(mongoUri);
    console.log("MongoDB connected");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (e) {
    console.error("MongoDB connection error:", e);
    process.exit(1);
  }
})();

