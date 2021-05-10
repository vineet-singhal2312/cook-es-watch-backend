require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
const { initializeDbConnection } = require("./db/db.connect");
const video = require("./routes/videos.router");
const history = require("./routes/history.router");
const likedVideos = require("./routes/likedvideos.router");
const watchLater = require("./routes/watchlater.router");
const playlist = require("./routes/playlist.router");
const dislikedvideos = require("./routes/dislikedvideos.router");
app.use(cors());

initializeDbConnection();
app.get("/", (req, res) => {
  res.send("Hello Worlddd!");
});
3;

app.use("/videos", video);
app.use("/historyvideos", history);
app.use("/likedvideos", likedVideos);
app.use("/watchlatervideos", watchLater);
app.use("/playlists", playlist);
app.use("/dislikedvideos", dislikedvideos);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
