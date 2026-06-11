const express = require("express");
const router = express.Router();

const Sell = require("../models/Sell");

// Create Sell Request
router.post("/", async (req, res) => {
  try {
    const sell = await Sell.create(req.body);
    res.status(201).json(sell);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Get All Sell Requests
router.get("/", async (req, res) => {
  try {
    const sells = await Sell.find();
    res.json(sells);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;