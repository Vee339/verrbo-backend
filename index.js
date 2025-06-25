const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

dotenv.config();

const usersRouter = require("./modules/users/router");
const videosRouter = require("./modules/listening_videos/router");
const writingRouter = require("./modules/writing_topics/router");
const speakingRouter = require("./modules/speaking_topics/router");
const readingRouter = require("./modules/reading_articles/router");
const storiesRouter = require("./modules/short_stories/router");
const journalRouter = require("./modules/journal_entries/router");
const writingsRouter = require("./modules/user_writings/router");

const app = express();
const port = process.env.PORT || "8888";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  sessions({
    secret: process.env.SESSIONSECRET,
    name: "verrboSessionId",
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DBHOST }),
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      httpOnly: true,
    },
  })
);

app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [
        "https://veerpalkaur.com",
        "https://www.veerpalkaur.com",
        "https://veerpalkaur.com/verrbo",
        "https://www.veerpalkaur.com/verrbo",
        "http://localhost:5173",
      ];
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use("/", videosRouter);
app.use("/", writingRouter);
app.use("/", speakingRouter);
app.use("/", readingRouter);
app.use("/", storiesRouter);
app.use("/", usersRouter);
app.use("/", journalRouter);
app.use("/", writingsRouter);

app.get("/", async (req, res) => {
  res.send("This is the test command.");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
