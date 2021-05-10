const express = require("express");
const { LikedVideo } = require("../model/likedvideos.model");
const { Video } = require("../model/video.model");
const app = express();
const router = express.Router();

router
  .route("/")

  //   .get(async (req, res) => {
  //     try {
  //       const result = await LikedVideo.find().populate("id");
  //       // console.log("............22");
  //       res.send(result);
  //       console.log(result);
  //     } catch (error) {
  //       res.status(404).send({ message: "error" });
  //     }
  //   })
  .post(async (req, res) => {
    try {
      const { Id } = req.body;

      await Video.findByIdAndUpdate(Id, { isDislike: true });
      const result = await Video.find({ _id: Id });
      console.log(result[0]);

      res.send(result[0]);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { Id } = req.body;

      // console.log(likedVideoid);
      await Video.findByIdAndUpdate(Id, { isDislike: false });

      const result = await Video.find({ _id: Id });
      console.log(result[0]);

      res.send(result[0]);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;
