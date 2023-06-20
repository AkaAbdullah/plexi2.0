const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema(
  {
    orderCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "USERS",
    },
    orderNo: {
      type: String,
      required: [true, "Please add a order number"],
      unique: true,
    },
    orderDetails: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ORDERS", ordersSchema);
