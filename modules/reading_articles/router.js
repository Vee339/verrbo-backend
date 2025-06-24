var express = require("express");
var router = express.Router();
const model = require("./db.js");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/api/readingarticles", async (req, res) => {
  const readingArticles = await model.getReadingArticles();
  res.json(readingArticles);
});

router.post("/api/addreadingarticle", async (req, res) => {
  const {
    title,
    content,
    level,
    websiteName,
    websiteUrl,
    authorName,
    articleUrl,
  } = req.body;
  await model.addReadingArticle(
    title,
    content,
    level,
    websiteName,
    websiteUrl,
    authorName,
    articleUrl
  );
  res.status(201).json({ message: "Reading Article added successfully" });
});

router.put("/api/updatereadingarticle", async (req, res) => {
  const {
    id,
    title,
    content,
    level,
    websiteName,
    websiteUrl,
    authorName,
    articleUrl,
  } = req.body;
  await model.updateReadingArticle(
    id,
    title,
    content,
    level,
    websiteName,
    websiteUrl,
    authorName,
    articleUrl
  );
  res
    .status(201)
    .json({ message: "Reading Article has been updated successfully" });
});

router.delete("/api/deletereadingarticle", async (req, res) => {
  let id = req.query.id;
  await model.deleteReadingArticle(id);
  res
    .status(201)
    .json({ message: "Reading Article has been deleted successfully" });
});

module.exports = router;
