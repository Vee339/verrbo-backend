const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const dbUrl = process.env.DBHOST;

// Set up the speaking_topic Schema and Model
const speakingTopicSchema = new mongoose.Schema({
  topic: String,
  level: String,
  created_at: Date,
});

const SpeakingTopic = mongoose.model(
  "SpeakingTopic",
  speakingTopicSchema,
  "speaking_topics"
);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function getSpeakingTopics() {
  await connect();
  const speakingTopics = await SpeakingTopic.find({});
  return speakingTopics;
}

async function getSpeakingTopic() {
  await connect();
  const speakingTopics = await SpeakingTopic.find({});
  const randomTopic = pickRandomTopic(speakingTopics);
  return randomTopic;
}

async function addSpeakingTopic(topic, level) {
  await connect();
  const currentDate = Date();
  const speaking_topic = new SpeakingTopic({
    topic: topic,
    level: level,
    created_at: currentDate,
  });
  await speaking_topic.save();
}

async function updateSpeakingTopic(id, topic, level) {
  await connect();

  const topicId = new ObjectId(id);

  const result = await SpeakingTopic.updateOne(
    { _id: topicId },
    { topic: topic, level: level },
    { new: true }
  );

  if (!result) {
    throw new Error("Speaking Topic not found");
  }

  return result;
}

async function deleteSpeakingTopic(id) {
  await connect();
  const topicId = new ObjectId(id);
  await SpeakingTopic.deleteOne({ _id: topicId });
}

module.exports = {
  getSpeakingTopics,
  getSpeakingTopic,
  addSpeakingTopic,
  updateSpeakingTopic,
  deleteSpeakingTopic,
};

function pickRandomTopic(topics) {
  const itemsCount = topics.length;
  const randomIndex = Math.floor(Math.random() * itemsCount);
  const randomItem = topics[randomIndex];
  return randomItem;
}
