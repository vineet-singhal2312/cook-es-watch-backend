const FindUserSendData = async (userId, collection, res) => {
  const result = await collection.find({ userId }).populate("videos");
  return res.status(200).json({ success: true, message: `sent data`, result });
};

const PostVideo = async (userId, videoId, collection, res) => {
  const user = await collection.find({ userId });
  if (user.length === 0) {
    const newAddToBeVideo = new collection({
      userId: userId,
      videos: [videoId],
    });

    await newAddToBeVideo.save();

    const result = await collection.find({ userId }).populate("videos");

    return res
      .status(200)
      .json({ success: true, message: `data post`, result });
  } else {
    const videoStatus = user[0].videos.includes(videoId);

    if (!videoStatus) {
      await collection.findByIdAndUpdate(user[0]._id, {
        $push: { videos: videoId },
      });
    }
  }

  const result = await collection.find({ userId }).populate("videos");

  res
    .status(200)
    .json({ success: true, message: `${collection} post`, result });
};

const DeleteVideo = async (userId, videoId, collection, res) => {
  const user = await collection.find({ userId });

  await collection.findByIdAndUpdate(user[0]._id, {
    $pull: { videos: videoId },
  });

  const result = await collection.find({ userId }).populate("videos");
  res
    .status(200)
    .json({ success: true, message: `${collection} deleted`, result });
};

module.exports = { FindUserSendData, PostVideo, DeleteVideo };
