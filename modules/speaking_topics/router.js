var express = require("express");
var router = express.Router();
const model = require("./db.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/api/speakingtopics", async (req, res) => {
  const speakingTopics = await model.getSpeakingTopics();
  res.json(speakingTopics);
});
router.get("/api/speakingtopic", async (req, res) => {
  const speakingTopic = await model.getSpeakingTopic();
  res.json(speakingTopic);
});

router.post("/api/addspeakingtopic", async (req, res) => {
  const { topic, level } = req.body;
  await model.addSpeakingTopic(topic, level);
  res.status(201).json({ message: "Speaking Topic added successfully" });
});

router.put("/api/updatespeakingtopic", async (req, res) => {
  const { id, topic, level } = req.body;
  await model.updateSpeakingTopic(id, topic, level);
  res.status(201).json({ message: "Speaking Topic updated successfully" });
});

router.delete("/api/deletespeakingtopic", async (req, res) => {
  let id = req.query.id;
  await model.deleteSpeakingTopic(id);
  res.status(201).json({ message: "Speaking Topic deleted successfully" });
});

module.exports = router;
