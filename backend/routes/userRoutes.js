const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  loginUser,
  getMe,
  getAllUsers,
} = require("../controllers/userControllers");

const { protect } = require("../middlewares/authMiddleware");

//getting all users get rout

router.get("/", protect, getAllUsers);

router.get("/editusers", protect, getUsers);

//creating a new user
router.post("/", registerUser);

//update password route
router.put("/:id", protect, getMe);

router.post("/login", loginUser);

module.exports = router;
