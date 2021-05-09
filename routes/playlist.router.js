const express = require("express");
const { PlayList } = require("../model/palylist.model");

const app = express();
const router = express.Router();

router
  .route("/")

  .get(async (req, res) => {
    try {
      const playlists = await PlayList.find().populate("videos");

      res.send(playlists);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })

  .post(async (req, res) => {
    try {
      const { name } = req.body;

      const newPlayList = new PlayList({ name: name, videos: [] });
      await newPlayList.save();
      const playlists = await PlayList.find().populate("videos");

      res.send(playlists);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { playlistId } = req.body;

      console.log(playlistId);

      await PlayList.findByIdAndDelete(playlistId);

      const playlists = await PlayList.find().populate("videos");
      res.send(playlists);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

router
  .route("/videos")

  .post(async (req, res) => {
    try {
      const { videoId, playlistId } = req.body;

      console.log("1");

      console.log(videoId, playlistId);

      const playlist = await PlayList.find({ _id: playlistId });

      if (playlist[0].videos.length === 0) {
        await PlayList.findByIdAndUpdate(playlistId, {
          $push: { videos: videoId },
        });
      }

      if (playlist[0].videos.length > 0) {
        console.log("andar");

        const state = playlist[0].videos.includes(videoId);
        console.log(state);

        if (state !== true) {
          console.log("andar AGAIN");

          await PlayList.findByIdAndUpdate(playlistId, {
            $push: { videos: videoId },
          });
        }
      }

      const playlists = await PlayList.find().populate("videos");
      res.send(playlists);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })

  .delete(async (req, res) => {
    try {
      const { videoId, playlistId } = req.body;

      // console.log(videoId, playlistId);

      await PlayList.findByIdAndUpdate(playlistId, {
        $pull: { videos: videoId },
      });

      const playlists = await PlayList.find().populate("videos");
      res.send(playlists);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;
