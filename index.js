const express = require("express");

const { connection } = require("./config/db.js");
const { userController } = require("./routes/user.routes");
const { authentication } = require("./middlewares/authentication");

require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());
app.use("/user", userController);
app.use(authentication);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch {
    console.log("Unable to connect to db, Something went wrong!");
  }
  console.log(`Listening to ${process.env.PORT}`);
});
