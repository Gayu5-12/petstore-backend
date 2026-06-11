const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    breed: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
    },

    category: {
      type: String,
      enum: ["Dog", "Cat", "Bird", "Rabbit", "Other"],
    },

    image: {
      type: String,
    },

    description: {
      type: String,
    },

    adoptionStatus: {
      type: String,
      enum: ["Available", "Pending", "Adopted"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pet", petSchema);