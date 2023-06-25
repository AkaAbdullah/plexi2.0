const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
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
  marketPlaceOrderId: {
    type: String,
  },
  tracking: {
    type: String,
  },

  shippingCost: {
    type: String,
  },

  orderDetails: {
    type: Array,
  },
  createdAt: {
    type: String,
  },
});

module.exports = mongoose.model("ORDERS", ordersSchema);
