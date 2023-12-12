const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { connectToDatabase } = require("./config/db.js");
const { userController } = require("./routes/user.routes.js");
const { authentication } = require("./middlewares/authentication.js");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "welcome to MyHours",
  });
});
app.use("/user", userController);
app.use(authentication);

app.listen(process.env.PORT, async () => {
  try {
    await connectToDatabase;
    console.log("Connected to the database");
  } catch (error) {
    console.error("Unable to connect to the database. Error:", error.message);
    process.exit(1);
  }
  console.log(`Server is listening on port ${process.env.PORT}`);
});
