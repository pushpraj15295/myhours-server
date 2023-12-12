require("dotenv").config();
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/user.model.js");
const userController = Router();

userController.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 6);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ msg: "Signup Successful!!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
});

userController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ msg: "Invalid credentials/user not found" });
    }

    const hash = user.password;
    const result = await bcrypt.compare(password, hash);

    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.json({ msg: "Login Successful", token });
    } else {
      res.status(401).json({ msg: "Invalid credentials/user not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = {
  userController,
};
