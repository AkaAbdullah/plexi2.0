const asyncHandler = require("express-async-handler");
const USERS = require("../modals/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Get All users GET request

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await USERS.find(); // Assuming your user model is named "User"
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

//Editing  All Users to Super User page
const getUsers = asyncHandler(async (req, res) => {
  //Check if a user is present to make a api call
  const user_id = req.user.id;
  if (user_id) {
    const superUser = await USERS.findById(user_id);
    if (superUser.roles === "superUser") {
      res.status(200).json({ message: "You are a super user" });
    } else {
      res.status(400);
      throw new Error("Not a SuperUser");
    }
  } else {
    res.status(400);
    throw new Error("no Access ");
  }
});

//updating user password put request
const getMe = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    console.log(id, password);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Update the password in the database for the specified user ID
    await USERS.findByIdAndUpdate(id, { password: hashedPassword });

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Password update failed" });
  }
});

//Creating a USER POST REQUEST
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, roles } = req.body;
  if (!userName || !email || !password || !roles) {
    res.status(400);
    throw new Error("Please Add all Fields");
  }
  //check if the userName Already exists
  const userExists = await USERS.findOne({ userName });
  if (userExists) {
    res.status(400);
    throw new Error("User Name already exists");
  }
  //HASH password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //creating the user
  const user = await USERS.create({
    userName,
    email,
    password: hashedPassword,
    roles,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      roles: user.roles,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// Login User Route

const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body.userName);
  //Check for userName in database
  const user = await USERS.findOne({ userName });

  //Check for the password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
      roles: user.roles,
    });
  } else {
    res.status(400);
    throw new Error("Invaid Credentials");
  }
});

//GENERATE JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
};
