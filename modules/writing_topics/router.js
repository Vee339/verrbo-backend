var express = require("express");
var router = express.Router();
const model = require("./db.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/api/writingtopics", async (req, res) => {
  const writingTopics = await model.getWritingTopics();
  res.json(writingTopics);
});
router.get("/api/writingtopic", async (req, res) => {
  const writingTopic = await model.getWritingTopic();
  res.json(writingTopic);
});

router.post("/api/addwritingtopic", async (req, res) => {
  const { topic, level } = req.body;
  await model.addWritingTopic(topic, level);
  res.status(201).json({ message: "Writing Topic added successfully" });
});

router.put("/api/updatewritingtopic", async (req, res) => {
  const { id, topic, level } = req.body;
  await model.updateWritingTopic(id, topic, level);
  res.status(201).json({ message: "Writing Topic updated successfully" });
});

router.delete("/api/deletewritingtopic", async (req, res) => {
  let id = req.query.id;
  await model.deleteWritingTopic(id);
  res.status(201).json({ message: "Writing Topic deleted successfully" });
});

module.exports = router;
