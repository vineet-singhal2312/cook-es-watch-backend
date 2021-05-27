const mongoose = require("mongoose");
const { Schema } = mongoose;

const LikedVideoSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User-sign-up" },
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

const LikedVideo = new mongoose.model("Liked-video", LikedVideoSchema);

module.exports = { LikedVideo };
