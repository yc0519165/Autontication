const bcrypt = require("bcrypt");
const UserModel = require("../Modules/user");
const jwt = require("jsonwebtoken");

const singup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User are Already exits, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "Singup Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errMsg, success: false });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(403).json({ message: errMsg, success: false });
    }
    const jwtToke = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_TOKEN,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Successful",
      success: true,
      jwtToke,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

module.exports = {
  singup,
  login,
};
