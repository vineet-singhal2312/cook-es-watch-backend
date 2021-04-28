const mongoose = require("mongoose");
const { Schema } = mongoose;

const WatchLaterSchema = new mongoose.Schema({
  id: { type: Schema.Types.ObjectId, ref: "Video" },
});

const WatchLater = new mongoose.model("Watchlater-video", WatchLaterSchema);

module.exports = { WatchLater };
