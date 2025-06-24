const mongoose = require("mongoose");
const { objectId } = require("mongodb");

const dbUrl = process.env.DBHOST;

// Set up the listening_video Schema and Model
const listeningVideoSchema = new mongoose.Schema({
  youtubeId: String,
  level: String,
  transcript: String,
  added_at: Date,
});

const ListeningVideo = mongoose.model(
  "ListeningVideo",
  listeningVideoSchema,
  "youtube_videos"
);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function getYouTubeVideos() {
  await connect();
  const youtubeVideos = await ListeningVideo.find({});
  return youtubeVideos;
}

async function addYouTubeVideo(youtubeId, level, transcript) {
  await connect();
  const currentDate = Date();
  const video = new ListeningVideo({
    youtubeId: youtubeId,
    level: level,
    transcript: transcript,
    added_at: currentDate,
  });
  await video.save();
}

async function deleteYouTubeVideo(id) {
  await connect();
  await ListeningVideo.deleteOne({ youtubeId: id });
}

async function updateYouTubeVideo(youtubeId, level, transcript) {
  await connect();

  const result = await ListeningVideo.updateOne(
    { youtubeId: youtubeId },
    { level: level, transcript: transcript },
    { new: true }
  );

  if (!result) {
    throw new Error("Video not found");
  }

  return result;
}

module.exports = {
  getYouTubeVideos,
  addYouTubeVideo,
  updateYouTubeVideo,
  deleteYouTubeVideo,
};
