const express = require("express");
const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  addOrderDetails,
  createMultipleOrders,
  countDocuments,
  getSingleOrder,
  markOrderComplete,
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

//Get single order
router.get("/:orderNo", protect, getSingleOrder);

//update single Order
router.put("/:id", protect, updateOrder);

router.delete("/:id", protect, deleteOrder);
//complete mark order route
router.put("/completemark/:id", protect, markOrderComplete);

module.exports = router;
