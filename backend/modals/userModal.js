const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add a user Name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an Email Address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    roles: {
      type: [String], // or type: String
      default: ["user"], // default role assigned when not specified
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("USERS", userSchema);
