const express = require("express");
const { PlayList } = require("../model/palylist.model");
const app = express();
const router = express.Router();

router
  .route("/")

  .get(async (req, res) => {
    try {
      const result = await PlayList.find().populate("videos");

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
      console.log(userId, playlistName);

      const user = await PlayList.find({ userId });
      console.log({ user }, userId, playlistName);
      if (user.length === 0) {
        const newAddToBePlaylist = new PlayList({
          userId: userId,
          playlists: [
            {
              playlistName: playlistName,
              videos: [],
            },
          ],
        });

        await newAddToBePlaylist.save();

        const result = await PlayList.find({ userId }).populate("videos");

        return res
          .status(200)
          .json({ success: true, message: `playlist name post`, result });
      } else {
        await PlayList.findByIdAndUpdate(user[0]._id, {
          $push: {
            playlists: {
              playlistName: playlistName,
              videos: [],
            },
          },
        });

        const result = await PlayList.find({ userId }).populate("videos");

        return res
          .status(200)
          .json({ success: true, message: `playlist name post`, result });
      }
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
      const { videoId, playlistId, name } = req.body;
      const { userId } = req.user;

      console.log(videoId, playlistId, userId);

      console.log("1");
      const user = await PlayList.find({ userId });
      console.log({ user });
      try {
        PlayList.updateOne(
          {
            _id: user._id,
            "playlists._id": playlistId,
          },
          {
            $push: {
              "playlists.$.videos": videoId,
            },
          }
        );

        // await PlayList.updateOne(
        //   { $and: [{ _id: userId }, { "playlists.playlistName": name }] },
        //   { $set: { "playlists.videos": videoId } }
        // );

        // User.findOneAndUpdate({'playlists._id': req.params.postId},{"$push":{"posts":{"likes":req.header.authenticatedUser.nick}}}

        // await PlayList.save();
      } catch (error) {
        console.log(error);
      }

      // console.log(
      //   user[0].playlists.find((playlist) => playlist._id == playlistId)
      // );
      // const updateTobePlayList = user[0].playlists.find(
      //   (playlist) => playlist._id == playlistId
      // );
      // // await updateTobePlayList.save();

      // // await a.save();
      // // console.log({ updateTobePlayList });
      // await PlayList.findByIdAndUpdate(userId, {
      //   playlists: [
      //     playlists.findByIdAndUpdate(playlistId, {
      //       $push: { videos: videoId },
      //     }),
      //   ],
      // });
      // // PlayList.markModified("videos");
      console.log("2");

      const result = await PlayList.find({ userId }).populate("videos");

      return res
        .status(200)
        .json({ success: true, message: `playlist name post`, result });

      // console.log(videoId, playlistId);

      // const playlist = await PlayList.find({ _id: playlistId });

      // if (playlist[0].videos.length === 0) {
      //   await PlayList.findByIdAndUpdate(playlistId, {
      //     $push: { videos: videoId },
      //   });
      // }

      // if (playlist[0].videos.length > 0) {
      //   console.log("andar");

      //   const state = playlist[0].videos.includes(videoId);
      //   console.log(state);

      //   if (state !== true) {
      //     console.log("andar AGAIN");

      //     await PlayList.findByIdAndUpdate(playlistId, {
      //       $push: { videos: videoId },
      //     });
      //   }
      // }

      // const playlists = await PlayList.find().populate("videos");
      // res.send(playlists);
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
