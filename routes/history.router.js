const express = require("express");
const app = express();
const router = express.Router();
const { Video } = require("../model/video.model");
const { HistoryVideo } = require("../model/history.model");

router
  .route("/")

  .get(async (req, res) => {
    try {
      const result = await HistoryVideo.find().populate("id");
      console.log("............22");
      res.send(result);
      // console.log(result);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { Id } = req.body;
      // console.log(Id);
      const video = await HistoryVideo.find({ id: Id });
      // console.log(video);

      if (video.length === 0) {
        const newHistoryVideo = new HistoryVideo({ id: Id });

        await newHistoryVideo.save();
      }
      res.send({ success: "true" });

      // res.send({ true: "true" });
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { historyVideo_id } = req.body;

      console.log(historyVideo_id);
      await HistoryVideo.findByIdAndDelete(historyVideo_id);
      const result = await HistoryVideo.find().populate("id");
      res.send(result);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;
