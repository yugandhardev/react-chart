const userModel = require("../models/userModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userCheck = await User.findOne({ name });
    const emailCheck = await User.findOne({ name });
    if (userCheck)
      return res
        .status(404)
        .json({ status: false, message: "Name is already exist" });
    if (emailCheck)
      return res
        .status(404)
        .json({ status: false, message: "Name is already exist" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    //delete user.password;
    return res
      .status(200)
      .json({ status: true, message: "Registration success" });
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "Email not exist" });
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res
        .status(404)
        .json({ status: false, message: "password not Match" });
    //delete user.password;
    return res
      .status(200)
      .json({ status: true, message: "Login success", user });
  } catch (err) {
    next(err);
  }
};
const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage: avatarImage.image,
      },
      { new: true } // updated record
    );
    //delete user.password;
    res.status(201).send({
      status: true,
      message: "profile Avatar successful",
      user,
    });
  } catch (err) {
    next();
  }
};
const allContacts = async (req, res, next) => {
  try {
    const allUser = await User.find({ _id: { $ne: req.params.id } }).select([
      "name",
      "email",
      "isAvatarImageSet",
      "avatarImage",
      "_id",
    ]);
    return res
      .status(200)
      .json({ status: true, message: "fetch successfull", allUser });
  } catch (err) {
    next(err);
  }
};
module.exports = { login, register, setAvatar, allContacts };
