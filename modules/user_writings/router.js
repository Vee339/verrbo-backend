var express = require("express");
var router = express.Router();
const model = require("./db.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/api/adduserwriting", async (req, res) => {
  const { userId, topicId, content, feedback } = req.body;
  await model.addUserWriting(userId, topicId, content, feedback);
  res.status(201).json({ message: "Writing has been added" });
});

module.exports = router;
