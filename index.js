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
    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database. Error:", error.message);
    process.exit(1); // Exit the process if unable to connect to the database
  }
  console.log(`Server is listening on port ${process.env.PORT}`);
});
