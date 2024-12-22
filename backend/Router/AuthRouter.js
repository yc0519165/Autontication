const { singup, login } = require("../Controllers/AuthController");
const {
  singupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/singup", singupValidation, singup);

module.exports = router;
