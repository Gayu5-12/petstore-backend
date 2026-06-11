const User = require("../models/User");
const Pet = require("../models/Pet");
const Adoption = require("../models/Adoption");
const Sell = require("../models/Sell");

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getPets = async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
};

exports.getAdoptions = async (req, res) => {
  const adoptions = await Adoption.find()
    .populate("petId");
  res.json(adoptions);
};

exports.getSellRequests = async (req, res) => {
  const sells = await Sell.find();
  res.json(sells);
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(
      req.params.id
    );

    if (!pet) {
      return res.status(404).json({
        message: "Pet not found",
      });
    }

    res.json({
      success: true,
      message: "Pet deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};