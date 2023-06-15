const express = require("express");
const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getOrders);

router.post("/", protect, createOrder);

router.put("/:id", protect, updateOrder);

router.delete("/:id", protect, deleteOrder);

module.exports = router;
