const ensureAuthonticated = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthonticated, (req, res) => {
  res.status(200).json([
    {
      name: "Moblie",
      price: 15000,
    },
    {
      name: "Remote",
      price: 1200,
    },
  ]);
});

module.exports = router;
