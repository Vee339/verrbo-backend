const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const dbUrl = process.env.DBHOST;

// Set up the user writing schema and Model
const userWritingSchema = new mongoose.Schema({
  user_id: ObjectId,
  topic_id: ObjectId,
  content: String,
  submitted_at: Date,
  feedback: String,
});

const UserWriting = mongoose.model(
  "UserWriting",
  userWritingSchema,
  "user_writings"
);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function addUserWriting(userId, topicId, content, feedback) {
  await connect();
  const currentDate = Date();
  const newWriting = new UserWriting({
    user_id: new ObjectId(userId),
    topic_id: new ObjectId(topicId),
    content: content,
    submitted_at: currentDate,
    feedback: feedback,
  });

  await newWriting.save();
}

module.exports = {
  addUserWriting,
};
