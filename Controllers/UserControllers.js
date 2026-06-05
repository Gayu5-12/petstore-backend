const User = require("../Models/UserModel");

const SignupUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, mobile } = req.body;
        const NewUser = new User({
            firstname,
            lastname,
            email,
            password,
            mobile,
        });
        const savedUser = await NewUser.save();
        res.status(201).json({
            message: "User registered successfully",
            data: savedUser,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error occurred while registering user",
            error: error.message
        });
    }
};

module.exports = { SignupUser } 