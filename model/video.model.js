const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  url: String,
  img: String,
  name: String,
  date: String,
  views: String,
  like: String,
  dislike: String,
  watchlater: Boolean,
  isLike: Boolean,
  isDislike: Boolean,
});

const Video = new mongoose.model("Video", videoSchema);

module.exports = { Video };

