const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  loginUser,
  getMe,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/authMiddleware");

router.get("/editusers", protect, getUsers);

router.post("/", registerUser);

router.get("/:id", protect, getMe);

router.post("/login", loginUser);

module.exports = router;
