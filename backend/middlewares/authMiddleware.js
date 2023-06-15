const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const USER = require("../modals/userModal");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get Token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      //GET USER from the token
      req.user = await USER.findById(decode.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized , no Token");
  }
});

module.exports = { protect };
