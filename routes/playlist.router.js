const express = require("express");
const { PlayList } = require("../model/palylist.model");
const {
  PostPlaylist,
  PostVideoInPlaylist,
  DeletePlaylist,
  DeleteVideoFrommPlaylist,
} = require("../controllers/playlistController");
const router = express.Router();

router
  .route("/")

  .get(async (req, res) => {
    try {
      const { userId } = req.user;

      const result = await PlayList.find({ userId }).populate("videos");

      return res
        .status(200)
        .json({ success: true, message: "playlists data", result });
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })

  .post(async (req, res) => {
    try {
      const { playlistName } = req.body;
      const { userId } = req.user;

      await PostPlaylist(userId, playlistName, PlayList, res);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { playlistId } = req.body;
      const { userId } = req.user;

      await DeletePlaylist(playlistId, PlayList, userId, res);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

router
  .route("/videos")

  .post(async (req, res) => {
    try {
      const { videoId, playlistId } = req.body;

      await PostVideoInPlaylist(playlistId, PlayList, videoId, res);
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  })

  .delete(async (req, res) => {
    try {
      const { videoId, playlistId } = req.body;
      const { userId } = req.user;

      await DeleteVideoFrommPlaylist(
        playlistId,
        PlayList,
        userId,
        videoId,
        res
      );
    } catch (error) {
      res.status(404).send({ message: "error" });
    }
  });

module.exports = router;
