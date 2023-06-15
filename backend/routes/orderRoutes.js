const express = require("express");
const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderControllers");
const router = express.Router();

router.get("/", getOrders);

router.post("/", createOrder);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

module.exports = router;
