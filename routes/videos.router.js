const express = require("express");
const app = express();
const router = express.Router();

const { Video } = require("../model/video.model");

router
  .route("/")

  .get(async (req, res) => {
    try {
      const result = await Video.find({});
      res.status(201).send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  });
router.route("/:videoId").get(async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    res.json(video);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
