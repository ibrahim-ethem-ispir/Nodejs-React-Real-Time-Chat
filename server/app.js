const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");
require("dotenv").config();
const port = process.env.PORT ?? 5001;

console.log("app js 8--------------------------------");

const allowlist = ["http://localhost:3000", "http:/localhost:3001"];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    console.log("engellenen url: ", origin);
    corsOptions = { origin: true };
  } else {
    console.log("izin verilen url: ", origin);
    corsOptions = { origin: false };
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(corsOptionsDelegate);

const server = app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor ...`);
});

const io = socket(server, { cors: true });

io.on("connection", (socket) => {
  console.log("Soket Bağlantısı Sağlandı !!!");
  console.log(socket.id);

  socket.on("message", (data) => {
    console.log("mesaj alanı");
    console.log(data);

    // gelen mesajı yönlendirme ( yayınlama )
    socket.to(data.room).emit("messageReturn", data)
  });

  socket.on("room", (room) => {
    socket.join(room);
  })

});

// examples

// const activeUsers = new Set();

// io.on("connection", function (socket) {
//   console.log("Made socket connection");

//   socket.on("new user", function (data) {
//     socket.userId = data;
//     activeUsers.add(data);
//     io.emit("new user", [...activeUsers]);
//   });

//   socket.on("disconnect", () => {
//     activeUsers.delete(socket.userId);
//     io.emit("user disconnected", socket.userId);
//   });
// });

// **************************************************************

// examples 2
// const socket = io();

// const inboxPeople = document.querySelector(".inbox__people");

// let userName = "";

// const newUserConnected = (user) => {
//   userName = user || `User${Math.floor(Math.random() * 1000000)}`;
//   socket.emit("new user", userName);
//   addToUsersBox(userName);
// };

// const addToUsersBox = (userName) => {
//   if (!!document.querySelector(`.${userName}-userlist`)) {
//     return;
//   }

//   const userBox = `
//     <div class="chat_ib ${userName}-userlist">
//       <h5>${userName}</h5>
//     </div>
//   `;
//   inboxPeople.innerHTML += userBox;
// };

// // new user is created so we generate nickname and emit event
// newUserConnected();

// socket.on("new user", function (data) {
//   data.map((user) => addToUsersBox(user));
// });

// socket.on("user disconnected", function (userName) {
//   document.querySelector(`.${userName}-userlist`).remove();
// });

// **************************************************************

// example 3

// const express = require("express");
// const socket = require("socket.io");

// App setup
// const PORT = 5000;
// const app = express();
// const server = app.listen(PORT, function () {
//   console.log(`Listening on port ${PORT}`);
//   console.log(`http://localhost:${PORT}`);
// });

// // Static files
// app.use(express.static("public"));

// // Socket setup
// const io = socket(server);

// const activeUsers = new Set();

// io.on("connection", function (socket) {
//   console.log("Made socket connection");

//   socket.on("new user", function (data) {
//     socket.userId = data;
//     activeUsers.add(data);
//     io.emit("new user", [...activeUsers]);
//   });

//   socket.on("disconnect", () => {
//     activeUsers.delete(socket.userId);
//     io.emit("user disconnected", socket.userId);
//   });

//   socket.on("chat message", function (data) {
//     io.emit("chat message", data);
//   });

//   socket.on("typing", function (data) {
//     socket.broadcast.emit("typing", data);
//   });
// });
