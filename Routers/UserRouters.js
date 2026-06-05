const Express = require("express");
const router = Express.Router();
const { SignupUser } = require("../Controllers/UserControllers");

router.post("/signup", SignupUser);
module.exports = router;