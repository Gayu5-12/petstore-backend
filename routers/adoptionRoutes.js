const express = require("express");
const router = express.Router();
const { createAdoption, getAllAdoptions } = require("../controllers/AdoptController");
const Adoption = require("../models/Adoption");

router.post("/", createAdoption);
router.get("/", getAllAdoptions);

// PUT /api/adoptions/:id  { status }
router.put("/:id", async (req, res) => {
  try {
    const adoption = await Adoption.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!adoption) return res.status(404).json({ message: "Not found" });
    res.json(adoption);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
