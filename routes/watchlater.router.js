const express = require("express");
const { WatchLater } = require("../model/watchlater.model");
const { Video } = require("../model/video.model");
const {
  FindUserSendData,
  PostVideo,
  DeleteVideo,
} = require("../controllers/routeControllers");
const app = express();
const router = express.Router();

router
  .route("/")

  .get(async (req, res) => {
    try {
      const { userId } = req.user;
      console.log(userId);

      await FindUserSendData(userId, WatchLater, res);
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { Id } = req.body;
      const { userId } = req.user;
      await PostVideo(userId, Id, WatchLater, res);
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { Id } = req.body;

      const { userId } = req.user;
      await DeleteVideo(userId, Id, WatchLater, res);
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  });

module.exports = router;
