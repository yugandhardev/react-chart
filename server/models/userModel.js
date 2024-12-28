const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 3,
    max: 15,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    max: 25,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 25,
    //select: false,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
module.exports = mongoose.model("Users", userSchema);
