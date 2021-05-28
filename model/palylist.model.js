const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlayListSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User-sign-up" },
  playlists: [
    {
      playlistName: String,
      videos: [
        {
          type: Schema.Types.ObjectId,
          ref: "Video",
        },
      ],
    },
  ],
});



const PlayList = new mongoose.model("Playlist", PlayListSchema);

module.exports = { PlayList };
