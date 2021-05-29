const PostPlaylist = async (userId, playlistName, collection, res) => {
  const newAddToBePlaylist = new collection({
    userId: userId,

    playlistName: playlistName,
    videos: [],
  });

  await newAddToBePlaylist.save();

  const result = await collection.find({ userId }).populate("videos");
 return res
    .status(200)
    .json({ success: true, message: `playlist name post`, result });
};

const PostVideoInPlaylist = async (playlistId, collection, videoId, res) => {
  try {
    const playlist = await collection.find({ _id: playlistId });
    const videoStatus = playlist[0].videos.includes(videoId);


    if (!videoStatus) {
      await collection.findByIdAndUpdate(playlistId, {
        $push: { videos: videoId },
      });
    }

    res
      .status(200)
      .json({ success: true, message: `video post in ${collection}` });
  } catch (error) {
    console.log(error);
  }
};

const DeletePlaylist = async (playlistId, collection, userId, res) => {
  await collection.findByIdAndDelete(playlistId);

  const result = await collection.find({ userId }).populate("videos");

  res.status(200).json({ success: true, message: `playlist deleted`, result });
};

const DeleteVideoFrommPlaylist = async (
  playlistId,
  collection,
  userId,
  videoId,
  res
) => {
  await collection.findByIdAndUpdate(playlistId, {
    $pull: { videos: videoId },
  });

  const result = await collection.find({ userId }).populate("videos");
  res.status(200).json({ success: true, message: `video deleted`, result });
};

module.exports = {
  PostPlaylist,
  PostVideoInPlaylist,
  DeletePlaylist,
  DeleteVideoFrommPlaylist,
};
