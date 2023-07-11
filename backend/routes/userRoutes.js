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

//creating a new user
router.post("/", registerUser);

//update password route
router.put("/:id", protect, getMe);

router.post("/login", loginUser);

module.exports = router;
