const mongoose = require("mongoose");
const { Schema } = mongoose;

const LikedVideoSchema = new mongoose.Schema({
  id: { type: Schema.Types.ObjectId, ref: "Video" },
});

const LikedVideo = new mongoose.model("Liked-video", LikedVideoSchema);

module.exports = { LikedVideo };
