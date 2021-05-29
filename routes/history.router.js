const express = require("express");
const router = express.Router();
const { HistoryVideo } = require("../model/history.model");
const {
  FindUserSendData,
  PostVideo,
  DeleteVideo,
} = require("../controllers/routeControllers");

router
  .route("/")

  .get(async (req, res) => {
    try {
      const { userId } = req.user;
      await FindUserSendData(userId, HistoryVideo, res);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { Id } = req.body;
      const { userId } = req.user;

      await PostVideo(userId, Id, HistoryVideo, res);

      const user = await HistoryVideo.find({ userId });
    } catch (error) {
      res.status(404).send({ message: "error!!!" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { historyVideo_id } = req.body;

      const { userId } = req.user;

      await DeleteVideo(userId, historyVideo_id, HistoryVideo, res);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;
