const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const dbUrl = process.env.DBHOST;

// Set up the writing_topic Schema and Model
const writingTopicSchema = new mongoose.Schema({
  topic: String,
  level: String,
  created_at: Date,
});

const WritingTopic = mongoose.model(
  "WritingTopic",
  writingTopicSchema,
  "writing_topics"
);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function getWritingTopics() {
  await connect();
  const writingTopics = await WritingTopic.find({});
  return writingTopics;
}

async function getWritingTopic() {
  await connect();
  const writingTopics = await WritingTopic.find({});
  const randomTopic = pickRandomTopic(writingTopics);
  return randomTopic;
}

async function addWritingTopic(topic, level) {
  await connect();
  const currentDate = Date();
  const writing_topic = new WritingTopic({
    topic: topic,
    level: level,
    created_at: currentDate,
  });
  await writing_topic.save();
}

async function updateWritingTopic(id, topic, level) {
  await connect();

  const topicId = new ObjectId(id);

  const result = await WritingTopic.updateOne(
    { _id: topicId },
    { topic: topic, level: level },
    { new: true }
  );

  if (!result) {
    throw new Error("Writing Topic not found");
  }

  return result;
}

async function deleteWritingTopic(id) {
  await connect();
  const topicId = new ObjectId(id);
  await WritingTopic.deleteOne({ _id: topicId });
}

module.exports = {
  getWritingTopics,
  getWritingTopic,
  addWritingTopic,
  updateWritingTopic,
  deleteWritingTopic,
};

function pickRandomTopic(topics) {
  const itemsCount = topics.length;
  const randomIndex = Math.floor(Math.random() * itemsCount);
  const randomItem = topics[randomIndex];
  return randomItem;
}
