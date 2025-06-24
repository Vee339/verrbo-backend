const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const dbUrl = process.env.DBHOST;

// Set up the short_stories Schema and Model
const shortStorySchema = new mongoose.Schema({
  title: String,
  level: String,
  image_filename: String,
  body: String,
});

const ShortStory = mongoose.model(
  "ShortStory",
  shortStorySchema,
  "short_stories"
);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function getShortStories() {
  await connect();
  const shortStories = await ShortStory.find({});
  return shortStories;
}

async function addShortStory(title, level, imageFilename, content) {
  await connect();
  const short_story = new ShortStory({
    title: title,
    level: level,
    image_filename: imageFilename,
    body: content,
  });
  await short_story.save();
}

async function updateShortStory(id, title, level, imageFilename, content) {
  await connect();

  const storyId = new ObjectId(id);

  const result = await ShortStory.updateOne(
    { _id: storyId },
    {
      title: title,
      level: level,
      image_filename: imageFilename,
      body: content,
    },
    { new: true }
  );

  if (!result) {
    throw new Error("Story not found");
  }

  return result;
}

async function deleteShortStory(id) {
  await connect();
  const storyId = new ObjectId(id);
  await ShortStory.deleteOne({ _id: storyId });
}

module.exports = {
  getShortStories,
  addShortStory,
  updateShortStory,
  deleteShortStory,
};
