const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema(
  {
    orderCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "USERS",
    },
    orderNo: {
      type: Number,
      required: [true, "Please add a order number"],
      unique: true,
    },
    marketPleacOrderId: {
      type: String,
      required: [true, "Please add a market place Order ID"],
    },
    thickness: {
      type: String,
      required: [true, "Please add thickness"],
    },
    length: {
      type: String,
    },
    width: {
      type: String,
    },
    diameter: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("ORDERS", ordersSchema);
