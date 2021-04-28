const mongoose = require("mongoose");
const { Schema } = mongoose;

const HistorySchema = new mongoose.Schema({
  id: { type: Schema.Types.ObjectId, ref: "Video" },
});

const HistoryVideo = new mongoose.model("History-video", HistorySchema);

module.exports = { HistoryVideo };
