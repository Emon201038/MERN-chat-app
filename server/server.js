const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const { port } = require("./secret");
const db = require("./src/configs/db");
const User = require("./src/models/usersModel");
const FriendRequest = require("./src/models/friendRequestModel");
const Conversations = require("./src/models/conversationModel");

const server = http.createServer(app);
const io = new Server(server, {
  // pingTimeout: 10000,
  cors: {
    origin:
      process.env.NODE_ENV === "development" ? "*" : "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// console.log(req.user);

server.listen(port, async (req) => {
  console.log(`server is running on http://localhost:${port}`);
  await db();
});
let users = [];
let onlineUsers = [];
let connectedUserOffline = [];
const addUser = (userId, socketId) => {
  !users.some((usr) => usr.userId === userId) &&
    users.push({ userId, socketId });
};
const addOnlineUser = async (userId, socketId) => {
  !users.some((usr) => usr?.userId === userId) &&
    onlineUsers.push({ user: await User.findById(userId), socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => socketId !== user.socketId);
};
const addOfflineUser = (socketId) => {
  const user = users.find((u) => u.socketId === socketId);
  const logic = !connectedUserOffline.some(
    (usr) => usr?.userId === user?.userId
  );
  if (logic) {
    connectedUserOffline.push(user);
  }
};

const removeOfflineUser = (userId) => {
  connectedUserOffline = connectedUserOffline.filter(
    (u) => u?.userId !== userId
  );
};

const getUser = (userId) => {
  return users.find((user) => user?.userId === userId);
};

io.on("connection", async (socket) => {
  const user_id = socket.handshake.query["user_id"];
  const socket_id = socket.id;

  if (user_id) {
    console.log(
      "new user is online. his socket_id: " +
        socket_id +
        "and His user id: " +
        user_id
    );
    removeOfflineUser(user_id);
    await User.findByIdAndUpdate(user_id, {
      socket_id: socket_id,
      status: "online",
    });

    // onlineUsers.some((u) => u.user._id !== user_id) &&
    //   onlineUsers.push({
    //     user: await User.findById(user_id),
    //     socketId: socket_id,
    //   });
    await addOnlineUser(user_id, socket_id);
    io.emit("test_online_users", onlineUsers);

    addUser(user_id, socket_id);
    console.log(users, "testing");
    io.emit("getUsers", users);
  }
  socket.on("userId", async (id) => {
    io.emit("offlineUser", connectedUserOffline);
    const conversation = await Conversations.find({
      participients: { $in: [user_id] },
    }).populate("participients", "-password");
    io.emit("get_conversations", conversation);
  });

  // socket event listeners here
  socket.on(
    "sendMessage",
    async ({
      senderId,
      receiverId,
      text,
      conversationId,
      messageStatus,
      createdAt,
    }) => {
      const user = getUser(receiverId);
      const userProfile = await User.findById(user?.userId);
      let status = messageStatus;
      if (userProfile?.status === "Online") {
        status = "delevered";
      }
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        receiverId,
        text,
        status,
        conversationId,
        createdAt,
      });
    }
  );

  socket.on("typing", ({ sender, receiver }) => {
    const user = getUser(receiver);
    io.to(user?.socketId).emit("typing");
  });

  socket.on("stopTyping", ({ sender, receiver }) => {
    const user = getUser(receiver);
    io.to(user?.socketId).emit("stopTyping");
  });

  socket.on("disconnect", async () => {
    console.log("User is disconnected, user socket id is :", socket.id);
    await User.findByIdAndUpdate(user_id, {
      socket_id: "",
      status: "offline",
    });

    onlineUsers = onlineUsers.filter((usr) => usr.socketId !== socket.id);

    io.emit("test_online_users", onlineUsers);

    // socket.disconnect(0);
    addOfflineUser(socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
    io.emit("offlineUser", connectedUserOffline);
    console.log(users);
  });
});

module.exports = { io };
