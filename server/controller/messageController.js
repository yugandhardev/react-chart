// import Messages from "../models/messageModel";
const Messages = require("../models/messageModel");
const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });
    if (data)
      return res.status(201).json({ status: true, message: "Message sent" });
  } catch (error) {
    next(err);
  }
};
const getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messagesData = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updateAt: 1 });
    console.log(messagesData);
    const mapMessages = messagesData.map((message) => {
      return {
        sentMesg: message.sender.toString() === from,
        message: message.message.text,
      };
    });
    if (mapMessages)
      return res
        .status(200)
        .json({ status: true, message: "fetching successfully", mapMessages });
  } catch (error) {
    next(err);
  }
};
module.exports = { addMessage, getMessage };
