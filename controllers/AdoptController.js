const Adoption =
require("../models/Adoption");

const Pet =
require("../models/Pet");

exports.createAdoption =
async(req,res)=>{

const adoption =
await Adoption.create(req.body);

await Pet.findByIdAndUpdate(
req.body.petId,
{
status:"pending"
}
);

res.status(201).json(adoption);

};

exports.getAllAdoptions =
async(req,res)=>{

const adoptions =
await Adoption.find()
.populate("petId");

res.json(adoptions);

};