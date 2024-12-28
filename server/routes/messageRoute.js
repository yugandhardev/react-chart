const { addMessage, getMessage } = require("../controller/messageController");

const express = require("express").Router();
express.post("/addMessage", addMessage);
express.post("/getMessages", getMessage);
module.exports = express;
