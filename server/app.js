const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const userRouter = require("./src/routes/userRouter");
const authRouter = require("./src/routes/authRouter");
const { cookie } = require("express-validator");
const friendRequestRouter = require("./src/routes/friendsRouter");
const messagesRouter = require("./src/routes/messagesRouter");
const postRouter = require("./src/routes/postRouter");
const commentRouter = require("./src/routes/commentRoute");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.use("/api/users", userRouter);
app.use("/api/user", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/friends", friendRequestRouter);
app.use("/api/conversation", messagesRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to home route of chat app",
  });
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
});

module.exports = app;
