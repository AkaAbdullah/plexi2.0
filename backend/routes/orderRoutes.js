const express = require("express");
const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  addOrderDetails,
} = require("../controllers/orderControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getOrders);

router.post("/", protect, createOrder);

router.post("/:orderno", protect, addOrderDetails);

router.put("/:id", protect, updateOrder);

router.delete("/:id", protect, deleteOrder);

module.exports = router;
