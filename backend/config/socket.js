const { Server } = require("socket.io");

let io;
const users = {};

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("register", (userId) => {
      users[userId] = socket.id;
      console.log("User Registered:", userId);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);

      for (let id in users) {
        if (users[id] === socket.id) {
          delete users[id];
          break;
        }
      }
    });
  });

  return io;
};

const getIO = () => io;

const getUsers = () => users;

module.exports = {
  initSocket,
  getIO,
  getUsers,
};