const mongoose = require("mongoose");
const { Schema } = mongoose;

const HistorySchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User-sign-up" },
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

const HistoryVideo = new mongoose.model("History-video", HistorySchema);

module.exports = { HistoryVideo };
