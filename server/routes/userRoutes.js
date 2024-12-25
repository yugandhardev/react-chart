const express = require("express");
const {
  register,
  login,
  setAvatar,
  allContacts,
} = require("../controller/userController");
const router = express.Router();
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/contacts/:id", allContacts);

module.exports = router;
