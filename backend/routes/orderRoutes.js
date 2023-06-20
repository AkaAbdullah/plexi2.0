const express = require("express");
const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  addOrderDetails,
  createMultipleOrders,
  countDocuments,
} = require("../controllers/orderControllers");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, getOrders); //please add protect

router.post("/", protect, createOrder); //please add protect

// router.post("/:orderno", protect, addOrderDetails);

//Route for only counting the documents in collections

router.get("/count", protect, countDocuments);

//createmulti order route
router.post("/generateorders", protect, createMultipleOrders);

router.put("/:id", protect, updateOrder);

router.delete("/:id", protect, deleteOrder);

module.exports = router;
