const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "USERS",
    },
    orderNo: {
      type: Number,
      required: [true, "Please add a order number"],
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("ORDERS", ordersSchema);
