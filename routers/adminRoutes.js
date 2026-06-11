const express = require("express");
const router = express.Router();

const {
  getUsers,
  getPets,
  getAdoptions,
  getSellRequests,
  deletePet,
} = require("../controllers/adminController");

router.get("/users", getUsers);
router.get("/pets", getPets);
router.get("/adoptions", getAdoptions);
router.get("/sells", getSellRequests);
router.delete("/pets/:id", deletePet);

module.exports = router;