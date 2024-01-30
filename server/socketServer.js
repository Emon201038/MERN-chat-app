const Conversations = require("./src/models/conversationModel");
const OneToOneMessage = require("./src/models/messagesModel");
const User = require("./src/models/usersModel");

const socketServer = (io) => {
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
      removeOfflineUser(user_id);
      await User.findByIdAndUpdate(user_id, {
        socket_id: socket_id,
        status: "online",
      });

      await addOnlineUser(user_id, socket_id);
      io.emit("test_online_users", onlineUsers);

      addUser(user_id, socket_id);
      io.emit("getUsers", users);
    }

    // socket event listeners here
    socket.on("userId", async (id) => {
      io.emit("offlineUser", connectedUserOffline);
      const conversation = await Conversations.find({
        participients: { $in: [user_id] },
      }).populate("participients", "-password");
      io.emit("get_conversations", conversation);
    });

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`);
    });

    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
      console.log(`User left room ${roomId}`);
    });

    socket.on(
      "sendMessage",
      async ({
        senderId,
        receiverId,
        text,
        conversationId,
        messageStatus,
        createdAt,
        _id,
      }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage", {
          senderId,
          receiverId,
          text,
          messageStatus,
          conversationId,
          createdAt,
          _id,
        });

        io.to(user?.socketId).emit("seenMessage", { _id, conversationId });

        const receiverProfile = await User.findById(receiverId);

        if (receiverProfile?.status === "online") {
          const updatedMessage = await OneToOneMessage.findByIdAndUpdate(
            _id,
            { messageStatus: "delevered" },
            { new: true, context: "query" }
          );
          io.emit("mark_as_delevered", updatedMessage);
        }
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
};

module.exports = socketServer;
