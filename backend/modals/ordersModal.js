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
      required: [true, "Please add an order number"],
      unique: true,
    },
    orderDetails: {
      type: Array,
    },
  },
  {
    timestamps: { currentTime: () => new Date().toLocaleDateString("en-PK") },
  }
);

module.exports = mongoose.model("ORDERS", ordersSchema);
