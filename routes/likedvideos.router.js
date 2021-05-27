const express = require("express");
const { LikedVideo } = require("../model/likedvideos.model");
const app = express();
const router = express.Router();

router
  .route("/")

  .get(async (req, res) => {
    try {
      const { userId } = req.user;
      console.log(userId);
      const result = await LikedVideo.find({ userId }).populate("videos");
      console.log("............22");

      res
        .status(200)
        .json({ success: true, message: "liked videos data", result });
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

      const user = await LikedVideo.find({ userId });
      console.log(user);

      if (user.length === 0) {
        console.log("ohhh naya user liked video me");

        console.log(userId);

        const newLikedVideo = new LikedVideo({
          userId: userId,
          videos: [Id],
        });
        console.log("111111");

        await newLikedVideo.save();
        console.log("22222");

        const result = await LikedVideo.find({ userId }).populate("videos");
        console.log("33333");

        return res
          .status(200)
          .json({ success: true, message: "video liked", result });
      } else {
        console.log("aap to bhagwaaan ke saman ho");
        console.log(user[0]._id);

        const videoStatus = user[0].videos.includes(Id);
        console.log(videoStatus);

        if (!videoStatus) {
          await LikedVideo.findByIdAndUpdate(user[0]._id, {
            $push: { videos: Id },
          });
        }
      }

      const result = await LikedVideo.find({ userId }).populate("videos");

      res.status(200).json({ success: true, message: "video liked", result });
    } catch (error) {
      res.status(404).send({ success: false, message: "error!!!" });
    }
  })
  .delete(async (req, res) => {
    try {
      console.log("sinchan sinchan pyara pyara");
      const { Id } = req.body;

      const { userId } = req.user;

      const user = await LikedVideo.find({ userId });
      console.log(user);
      console.log("lage he kitna cool");

      await LikedVideo.findByIdAndUpdate(user[0]._id, {
        $pull: { videos: Id },
      });

      console.log("jo hookum mere aka");
      const result = await LikedVideo.find({ userId }).populate("videos");

      res
        .status(200)
        .json({ success: true, message: "liked video delete", result });
    } catch (error) {
      res.status(404).send({ success: false, message: "error" });
    }
  });

module.exports = router;
