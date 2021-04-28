const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlayListSchema = new mongoose.Schema({
  name: String,
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

// const PlayListSchema = new mongoose.Schema({
//   name: String,
//   videos: [
//     {
//       id: {
//         type: Schema.Types.ObjectId,
//         ref: "Video",

//         index: { unique: true, dropDups: true },
//       },
//     },
//   ],
// });

// PlayListSchema.index({ id: 1 }, { unique: true, dropDups: true });

const PlayList = new mongoose.model("Playlist", PlayListSchema);

module.exports = { PlayList };
