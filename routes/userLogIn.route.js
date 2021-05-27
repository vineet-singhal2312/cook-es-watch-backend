const express = require("express");
const { userSignUp } = require("../model/userSignUp.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const app = express();
const router = express.Router();

const passwordAuthentication = (
  password,
  userPassword,
  id,
  email,
  name,
  res
) => {
  bcrypt.compare(password, userPassword, function (err, result) {
    if (err) {
      res.json({ message: "something is wrong" });
    }
    if (result) {
      console.log("jan do jan do sahi he");
      console.log(name);
      const token = jwt.sign(
        {
          userEmail: email,
          userId: id,
        },
        "secret",
        { expiresIn: "24h" }
      );

      res.status(200).json({
        success: true,
        message: "login successful",
        token,
        userName: name,
      });
    } else {
      res.status(400).json({ message: "authentication failed" });
    }
  });
};

router
  .route("/")

  .post(async (req, res) => {
    try {
      console.log("aa gaya huu me ninja hatoriii");
      const { email, password } = req.body;

      const user = await userSignUp.find({ email }).exec();
      console.log({ user });
      console.log(user[0].userName);

      if (user.length) {
        passwordAuthentication(
          password,
          user[0].password,
          user[0]._id,
          user[0].email,
          user[0].userName,
          res
        );

        console.log("user to hai");
      } else {
        console.log("user hi nhi he");

        res.status(400).json({ message: "check your email or password" });
      }
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;
