const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const { port } = require("./secret");
const db = require("./src/configs/db");
const User = require("./src/models/usersModel");
const Conversations = require("./src/models/conversationModel");
const socketServer = require("./socketServer");

const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 10000,
  cors: {
    origin:
      process.env.NODE_ENV === "development" ? "*" : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

socketServer(io);

server.listen(port, async (req) => {
  console.log(`server is running on http://localhost:${port}`);
  await db();
});
