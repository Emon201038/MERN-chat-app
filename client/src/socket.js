import io from "socket.io-client";

let socket;

const connectSocket = (user_id) => {
  socket = io("http://localhost:3001", {
    query: `user_id=${user_id}`,
    reconnectionDelay: 5000,
    reconnection: true,
    reconnectionAttempts: 5,
    autoConnect: true,
    transports: ["websocket"],
    rejectUnauthorized: false,
    upgrade: false,
    agent: false,
  });

  return socket;
};

export { socket, connectSocket };
