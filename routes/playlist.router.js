const express = require("express");
const { PlayList } = require("../model/palylist.model");
// const { WatchLater } = require("../model/watchlater.model");
// const { Video } = require("../model/video.model");
const app = express();
const router = express.Router();

router
  .route("/")

  //   .get(async (req, res) => {
  //     try {
  //       const result = await WatchLater.find().populate("id");
  //       // console.log("............22");
  //       res.send(result);
  //       console.log(result);
  //     } catch (error) {
  //       res.status(404).send({ message: "error" });
  //     }
  //   })
  .post(async (req, res) => {
    try {
      const { name } = req.body;

      const newPlayList = new PlayList({ name: name, videos: [] });
      await newPlayList.save();
      const playlists = await PlayList.find({});

      //   console.log(playlists);

      res.send(playlists);

      // res.send({ true: "true" });
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });
//   .delete(async (req, res) => {
//     try {
//       const { watchlatervideo_id, video_id } = req.body;

//       // console.log(likedVideoid);
//       await WatchLater.findByIdAndDelete(watchlatervideo_id);
//       await Video.findByIdAndUpdate(video_id, { watchlater: false });

//       const result = await WatchLater.find().populate("id");
//       res.send(result);
//     } catch (error) {
//       res.status(404).send({ message: "error" });
//     }
//   });

router
  .route("/videos")

  .post(async (req, res) => {
    try {
      const { videoId, playlistId } = req.body;

      //   const newPlayList = new PlayList({ name: name, videos: [] });
      //   await newPlayList.save();
      // const playlists = await PlayList.find({});
      console.log("1");

      console.log(videoId, playlistId);

      await PlayList.findByIdAndUpdate(playlistId, {
        $push: { videos: videoId },
      });
      // const playlists = await PlayList.find({});
      // res.send(playlists);

      // playlists.map(
      //   (playlist) => {
      //     console.log(playlist._id);
      //     if (playlist._id == playlistId) {
      //       console.log("2");
      //       console.log(playlist.videos.length);

      //       if (playlist.videos.length === 0) {
      //         console.log(playlist.videos.length);
      //         console.log(playlist._id);

      //         PlayList.findByIdAndUpdate(playlist._id, {
      //           name: "ram",
      //         });

      //         //   const newPlayList = new PlayList({ videos: [videoId] });
      //         //   newPlayList.save();
      //       }

      //       //   return { ...playlist };
      //     }

      //     // return { ...playlist };
      //   }
      //   // playlist._id === playlistId? playlist.videos.con
      // );

      // console.log("1");

      res.send({ true: "true" });
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;
