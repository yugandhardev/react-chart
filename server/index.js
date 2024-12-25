const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
//import userRoute from "./routes/userRoutes";
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoute");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 9000; // Ensure PORT is a number
const socket = require("socket.io");

app.get("/", (req, res) => {
  res.send("sending");
});
app.use("/api", userRouter);
app.use("/api/message", messageRouter);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected succesfully"))
  .catch((err) => console.error(err));
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userID) => {
    onlineUsers.set(userID, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
