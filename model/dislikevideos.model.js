const mongoose = require("mongoose");
const { Schema } = mongoose;

const DislikedVideoSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User-sign-up" },
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

const DislikedVideo = new mongoose.model("Disliked-video", DislikedVideoSchema);

module.exports = { DislikedVideo };
