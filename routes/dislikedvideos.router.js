const express = require("express");
const { DislikedVideo } = require("../model/dislikevideos.model");
const {
  FindUserSendData,
  PostVideo,
  DeleteVideo,
} = require("../controllers/routeControllers");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const { userId } = req.user;
      await FindUserSendData(userId, DislikedVideo, res);
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  })

  .post(async (req, res) => {
    try {
      const { Id } = req.body;
      const { userId } = req.user;

      await PostVideo(userId, Id, DislikedVideo, res);
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { Id } = req.body;
      const { userId } = req.user;
      await DeleteVideo(userId, Id, DislikedVideo, res);
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  });

module.exports = router;
