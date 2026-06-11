const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema(
{
  petId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Pet"
  },

  userName:String,
  email:String,
  phone:String,

  status:{
    type:String,
    default:"pending"
  }
},
{
  timestamps:true
});

module.exports =
mongoose.model(
  "Adoption",
  adoptionSchema
);