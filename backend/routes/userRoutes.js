const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  loginUser,
} = require("../controllers/userControllers");

router.get("/", getUsers);

router.post("/", registerUser);

router.post("/login", loginUser);

module.exports = router;
