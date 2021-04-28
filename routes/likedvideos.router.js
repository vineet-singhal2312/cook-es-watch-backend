const express = require("express");
const { LikedVideo } = require("../model/likedvideos.model");
const { Video } = require("../model/video.model");
const app = express();
const router = express.Router();

router
  .route("/")

  .get(async (req, res) => {
    try {
      const result = await LikedVideo.find().populate("id");
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

      const newLikedVideo = new LikedVideo({ id: Id });

      await newLikedVideo.save();
      await Video.findByIdAndUpdate(Id, { isLike: true });
      const result = await Video.find({});
      res.send(result);

      // res.send({ true: "true" });
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { likedvideo_id, video_id } = req.body;

      // console.log(likedVideoid);
      await LikedVideo.findByIdAndDelete(likedvideo_id);
      await Video.findByIdAndUpdate(video_id, { isLike: false });

      const result = await LikedVideo.find().populate("id");
      res.send(result);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;
