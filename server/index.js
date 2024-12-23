const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
//import userRoute from "./routes/userRoutes";
const userRouter = require("./routes/userRoutes");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 9000; // Ensure PORT is a number
app.get("/", (req, res) => {
  res.send("sending");
});
app.use("/api/auth", userRouter);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected succesfully"))
  .catch((err) => console.error(err));
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
