const mongoose = require("mongoose");
const { scryptSync } = require("crypto");

const dbUrl = process.env.DBHOST;

// Set up the user Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function getUser(username) {
  await connect();
  let result = await User.findOne({ username: username });
  return result ? result : false;
}

async function authenticateUser(username, pw) {
  await connect();
  let key = scryptSync(pw, process.env.SALT, 64);
  let result = await User.findOne({
    username: username,
    password: key.toString("base64"),
  });

  return result || false;
}

async function addUser(username, email, password, role) {
  await connect();
  let user = await getUser(username);
  if (!user) {
    let key = scryptSync(password, process.env.SALT, 64);
    const newUser = new User({
      username: username,
      email: email,
      password: key.toString("base64"),
      role: role,
    });
    let result = await newUser.save();
    if (result === newUser) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

module.exports = {
  addUser,
  getUser,
  authenticateUser,
};
