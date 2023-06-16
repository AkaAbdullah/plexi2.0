const mongoose = require("mongoose");

const multiLineOrderDetails = mongoose.Schema(
  {
    orderNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ORDERS",
      required: true,
    },
    thickness: { type: String, required: true },
    // length: { type: String },
    // width: { type: String },
    // diameter: { type: String },
    // quantity: { type: Number },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("ORDER_DETAILS", multiLineOrderDetails);
