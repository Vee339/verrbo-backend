const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const dbUrl = process.env.DBHOST;

const journalEntrySchema = new mongoose.Schema({
  user_id: ObjectId,
  entry_text: String,
  entry_date: Date,
});

const JournalEntry = mongoose.model(
  "JournalEntry",
  journalEntrySchema,
  "journal_entries"
);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function addJournalEntry(userId, text) {
  await connect();
  const currentDate = Date();
  const journal_entry = new JournalEntry({
    user_id: new ObjectId(userId),
    entry_text: text,
    entry_date: currentDate,
  });
  await journal_entry.save();
}

module.exports = {
  addJournalEntry,
};
