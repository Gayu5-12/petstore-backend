const Sell =
require("../models/Sell");

exports.createSell =
async(req,res)=>{

const sell =
await Sell.create(req.body);

res.status(201).json(sell);

};

exports.getAllSellRequests =
async(req,res)=>{

const data =
await Sell.find();

res.json(data);

};