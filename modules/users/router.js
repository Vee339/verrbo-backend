var express = require("express");
var router = express.Router();
const model = require("./db.js");
const middleware = require("./middleware");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/api/user/add", async (req, res) => {
  const { username, email, password, role } = req.body;
  const response = await model.addUser(username, email, password, role);
  let message;
  if (response) {
    message = "User is registered successfully";
  } else {
    message = "Registration Failed";
  }
  res.status(201).json({ message: message });
});

router.post("/api/user/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await model.authenticateUser(username, password);
  if (user) {
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.role = user.role;

    res.status(200).json({
      message: "Login Successful",
      role: user.role,
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.post("/api/user/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("verrboSessionId");
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.get("/api/user/session", (req, res) => {
  if (req.session.userId) {
    res.status(200).json({
      loggedIn: true,
      username: req.session.username,
      role: req.session.role,
    });
  } else {
    res.status(200).json({ loggedIn: false });
  }
});

module.exports = router;
