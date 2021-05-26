const mongoose = require("mongoose");
const { Schema } = mongoose;

const HistorySchema = new mongoose.Schema({
  userId: String,
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  // id: ,
});

const HistoryVideo = new mongoose.model("History-video", HistorySchema);

module.exports = { HistoryVideo };
