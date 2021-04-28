const express = require("express");
const app = express();
const router = express.Router();

const { Video } = require("../model/video.model");

router
  .route("/")
  //   .post(async (req, res) => {
  //     try {
  //       req.body;

  //       const video = new Video({
  //         url: "https://www.youtube.com/watch?v=qIX_CUsANpw",
  //         img: "./video_images/black-forest-cake.png",

  //         name:
  //           "Cooker Me 1 Kg Black Forest Eggless Cake Recipe - cookingshooking",
  //         date: "29 Nov 2020",
  //         views: "4.8M views",
  //         like: "114K",
  //         dislike: "4.7K",
  //         watchlater: false,
  //         isLike: false,
  //         isDislike: false,
  //       });

  //       const result = await video.save();
  //       res.status(201).send(result);

  //       await video.save();
  //     } catch (error) {
  //       res.status(404).send(error);
  //     }
  //   })
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
    // console.log(videoId);

    const video = await Video.findById(videoId);
    // console.log(video);

    res.json(video);

    // res.send({ video });
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
