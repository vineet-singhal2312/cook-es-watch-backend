const express = require("express");
const { WatchLater } = require("../model/watchlater.model");
const { Video } = require("../model/video.model");
const app = express();
const router = express.Router();

router
  .route("/")

  .get(async (req, res) => {
    try {
      const result = await WatchLater.find().populate("id");
      // console.log("............22");
      res.send(result);
      console.log(result);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { Id } = req.body;
      // console.log(Id);
      // console.log(video);

      const newWatchLaterVideo = new WatchLater({ id: Id });

      await newWatchLaterVideo.save();
      await Video.findByIdAndUpdate(Id, { watchlater: true });
      const result = await Video.find({});
      res.send(result);

      // res.send({ true: "true" });
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { watchlatervideo_id, video_id } = req.body;

      // console.log(likedVideoid);
      await WatchLater.findByIdAndDelete(watchlatervideo_id);
      await Video.findByIdAndUpdate(video_id, { watchlater: false });

      const result = await WatchLater.find().populate("id");
      res.send(result);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;
