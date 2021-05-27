const express = require("express");
const { WatchLater } = require("../model/watchlater.model");
const { Video } = require("../model/video.model");
const app = express();
const router = express.Router();

router
  .route("/")

  .get(async (req, res) => {


    try {
      const { userId } = req.user;
      console.log(userId);
      const result = await WatchLater.find({ userId }).populate("videos");
      console.log("............22");

      res
        .status(200)
        .json({ success: true, message: "WatchLater data", result });
      console.log(result);
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  })
  .post(async (req, res) => {


    try {
      const { Id } = req.body;
      console.log(Id);
      const { userId } = req.user;

      const user = await WatchLater.find({ userId });
      console.log(user);

      if (user.length === 0) {
        console.log("ohhh naya user liked video me");

        console.log(userId);

        const newWatchlater = new WatchLater({
          userId: userId,
          videos: [Id],
        });
        console.log("111111");

        await newWatchlater.save();
        console.log("22222");

        const result = await WatchLater.find({ userId }).populate("videos");
        console.log("33333");

        return res
          .status(200)
          .json({ success: true, message: "Watchlater videos", result });
      } else {
        console.log("aap to bhagwaaan ke saman ho");
        console.log(user[0]._id);

        const videoStatus = user[0].videos.includes(Id);
        console.log(videoStatus);

        if (!videoStatus) {
          await WatchLater.findByIdAndUpdate(user[0]._id, {
            $push: { videos: Id },
          });
        }
      }

      const result = await WatchLater.find({ userId }).populate("videos");

      res
        .status(200)
        .json({ success: true, message: "WatchLater videos", result });
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .delete(async (req, res) => {


    try {
      console.log("sinchan sinchan pyara pyara");
      const { Id } = req.body;

      const { userId } = req.user;

      const user = await WatchLater.find({ userId });
      console.log(user);
      console.log("lage he kitna cool");

      await WatchLater.findByIdAndUpdate(user[0]._id, {
        $pull: { videos: Id },
      });

      console.log("jo hookum mere aka");
      const result = await WatchLater.find({ userId }).populate("videos");

      res
        .status(200)
        .json({ success: true, message: "WatchLater video delete", result });
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  });

module.exports = router;
