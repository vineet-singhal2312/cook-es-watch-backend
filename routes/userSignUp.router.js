const express = require("express");
const { userSignUp } = require("../model/userSignUp.model");
const bcrypt = require("bcrypt");

const app = express();
const router = express.Router();

const bcryptPasswordGenerator = (password, userName, email, res) => {
  bcrypt.hash(password, 10, function (err, bcryptPassword) {
    if (err) {
      res.status(403).json({ message: "something is wrong" });
    } else {
      saveUser(bcryptPassword, userName, email, res);
    }
  });
};

const saveUser = async (bcryptPassword, userName, email, res) => {
  try {
    const newUser = new userSignUp({
      userName: userName,
      email: email,
      password: bcryptPassword,
    });
    await newUser.save();

    res
      .status(200)
      .json({ success: true, message: "Your registration is successful" });
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: "something is wrong in saving user" });
  }
};

router
  .route("/")

  .post(async (req, res) => {
    try {
        console.log("aa gaya huu me ninja hatoriii")
      const { userName, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        res.status(400).json({ message: "Both password are not same!!" });
      } else {
        bcryptPasswordGenerator(password, userName, email, res);
      }
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;
