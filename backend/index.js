// nodemon in module to use add any changes

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./Router/AuthRouter");
const productRouter = require("./Router/ProductRouter");
require("dotenv").config();
require("./Modules/db");

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("Port connected");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});
