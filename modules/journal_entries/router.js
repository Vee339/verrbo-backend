var express = require("express");
var router = express.Router();
const model = require("./db.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/api/addjournalentry", async (req, res) => {
  const { userId, text } = req.body;
  await model.addJournalEntry(userId, text);
  res.status(201).json({ message: "Journal Entry has been added" });
});

module.exports = router;
