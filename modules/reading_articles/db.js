const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const dbUrl = process.env.DBHOST;

// Set up the short_stories Schema and Model
const readingArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  level: String,
  website_name: String,
  website_url: String,
  author_name: String,
  article_url: String,
});

const ReadingArticle = mongoose.model(
  "ReadingArticle",
  readingArticleSchema,
  "reading_articles"
);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function getReadingArticles() {
  await connect();
  const readingArticles = await ReadingArticle.find({});
  return readingArticles;
}

async function addReadingArticle(
  title,
  content,
  level,
  websiteName,
  websiteUrl,
  authorName,
  articleUrl
) {
  await connect();
  const reading_article = new ReadingArticle({
    title: title,
    content: content,
    level: level,
    website_name: websiteName,
    website_url: websiteUrl,
    author_name: authorName,
    article_url: articleUrl,
  });
  await reading_article.save();
}

async function updateReadingArticle(
  id,
  title,
  content,
  level,
  websiteName,
  websiteUrl,
  authorName,
  articleUrl
) {
  await connect();

  const articleId = new ObjectId(id);

  const result = await ReadingArticle.updateOne(
    { _id: articleId },
    {
      title: title,
      content: content,
      level: level,
      website_name: websiteName,
      website_url: websiteUrl,
      author_name: authorName,
      article_url: articleUrl,
    },
    { new: true }
  );

  if (!result) {
    throw new Error("Reading Article not found");
  }

  return result;
}

async function deleteReadingArticle(id) {
  await connect();
  const articleId = new ObjectId(id);
  await ReadingArticle.deleteOne({ _id: articleId });
}

module.exports = {
  getReadingArticles,
  addReadingArticle,
  updateReadingArticle,
  deleteReadingArticle,
};
