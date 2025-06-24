var express = require("express");
var router = express.Router();
const model = require("./db.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/api/listeningvideos", async (req, res) => {
  const listeningVideos = await model.getYouTubeVideos();
  res.json(listeningVideos);
});

router.post("/api/addyoutubevideo", async (req, res) => {
  const { youtubeId, level, transcript } = req.body;
  await model.addYouTubeVideo(youtubeId, level, transcript);
  res.status(201).json({ message: "Video added successfully" });
});

router.delete("/api/deleteyoutubevideo", async (req, res) => {
  let id = req.query.youtubeId;
  await model.deleteYouTubeVideo(id);
  res.status(201).json({ message: "Video deleted successfully" });
});

router.put("/api/updateyoutubevideo", async (req, res) => {
  const { youtubeId, level, transcript } = req.body;
  await model.updateYouTubeVideo(youtubeId, level, transcript);
  res.status(201).json({ message: "Video updated successfully" });
});

module.exports = router;
