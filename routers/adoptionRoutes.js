const express = require("express");
const router = express.Router();

const {
  createAdoption,
  getAllAdoptions,
} = require("../controllers/AdoptController");

router.post("/", createAdoption);
router.get("/", getAllAdoptions);

module.exports = router;