const express = require("express");
const { userSignUp } = require("../model/userSignUp.model");
const bcrypt = require("bcrypt");
const { bcryptPasswordGenerator } = require("../controllers/signupController");

const app = express();
const router = express.Router();

router
  .route("/")

  .post(async (req, res) => {
    try {
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
