const express = require("express");
const router = express.Router();
const { getAllPets, getPetById, createPet } = require("../controllers/petController");
const Pet = require("../models/Pet");

router.get("/", getAllPets);
router.get("/:id", getPetById);
router.post("/", createPet);

// PUT /api/pets/:id
router.put("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json({ success: true, pet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/pets/:id
router.delete("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json({ success: true, message: "Pet deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
