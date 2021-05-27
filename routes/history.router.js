const express = require("express");
const app = express();
const router = express.Router();
const { Video } = require("../model/video.model");
const { HistoryVideo } = require("../model/history.model");

router
  .route("/")

  .get(async (req, res) => {
    try {
      const { userId } = req.user;
      console.log(userId);
      const result = await HistoryVideo.find({ userId }).populate("videos");
      console.log("............22");

      res.status(200).json(result);
      console.log(result);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })
  .post(async (req, res) => {
    try {
      const { Id } = req.body;
      console.log(Id);
      const { userId } = req.user;

      const user = await HistoryVideo.find({ userId });
      console.log(user);

      if (user.length === 0) {
        console.log("ohhh naya user");

        console.log(userId);

        const newHistoryVideo = new HistoryVideo({
          userId: userId,
          videos: [Id],
        });

        await newHistoryVideo.save();
      } else {
        console.log("aap to bhagwaaan ke saman ho");
        console.log(user[0]._id);

        const videoStatus = user[0].videos.includes(Id);
        console.log(videoStatus);

        if (!videoStatus) {
          await HistoryVideo.findByIdAndUpdate(user[0]._id, {
            $push: { videos: Id },
          });
        }
      }
      res.status(200).json({ success: "true" });
    } catch (error) {
      res.status(404).send({ message: "error!!!" });
    }
  })
  .delete(async (req, res) => {
    try {
      console.log("sinchan sinchan pyara pyara");
      const { historyVideo_id } = req.body;

      const { userId } = req.user;

      const user = await HistoryVideo.find({ userId });
      console.log(user);
      console.log("lage he kitna cool");

      await HistoryVideo.findByIdAndUpdate(user[0]._id, {
        $pull: { videos: historyVideo_id },
      });

      console.log("jo hookum mere aka");
      const result = await HistoryVideo.find({ userId }).populate("videos");

      res.status(200).json(result);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;
