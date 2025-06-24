var express = require("express");
var router = express.Router();
const model = require("./db.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/api/shortstories", async (req, res) => {
  const shortStories = await model.getShortStories();
  res.json(shortStories);
});

router.post("/api/addshortstory", async (req, res) => {
  const { title, level, filename, content } = req.body;
  await model.addShortStory(title, level, filename, content);
  res.status(201).json({ message: "Story was added successfully" });
});

router.put("/api/updateshortstory", async (req, res) => {
  const { id, title, level, filename, content } = req.body;
  await model.updateShortStory(id, title, level, filename, content);
  res.status(201).json({ message: "Story has been updated successfully" });
});

router.delete("/api/deleteshortstory", async (req, res) => {
  let id = req.query.id;
  await model.deleteShortStory(id);
  res
    .status(201)
    .json({ message: "Short Story has been deleted successfully" });
});

module.exports = router;
