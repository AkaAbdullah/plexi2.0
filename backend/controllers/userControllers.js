const asyncHandler = require("express-async-handler");
const USERS = require("../modals/userModal");

//Getting All Users to admin page
const getUsers = (req, res) => {
  res.json({ message: "All users here" });
};

//Creating a USER POST REQUEST
const registerUser = (req, res) => {
  res.json({ message: "registeruser" });
};

const loginUser = (req, res) => {
  res.json({ message: "Login User" });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
};
