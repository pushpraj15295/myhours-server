const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { connectToDatabase } = require("./config/db.js");
connectToDatabase
const { userController } = require("./routes/user.routes.js");
const { authentication } = require("./middlewares/authentication.js");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json('welcome to myhours');
});
app.use(authentication);
app.use("/user", userController);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

module.exports = app