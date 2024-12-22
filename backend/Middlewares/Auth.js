const jwt = require("jsonwebtoken");
const ensureAuthonticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(200)
      .json({ message: "unauthirized, jwt token is require" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "unauthorised, jwt token wrong or expired" });
  }
};

module.exports = ensureAuthonticated;
