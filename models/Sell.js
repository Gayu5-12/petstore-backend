const mongoose = require("mongoose");

const sellSchema = new mongoose.Schema(
{
  ownerName:String,
  email:String,
  petName:String,
  breed:String,
  age:Number,
  price:Number,
  image:String,

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
  "Sell",
  sellSchema
);