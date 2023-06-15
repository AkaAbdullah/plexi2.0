const asyncHandler = require("express-async-handler");
const ORDERS = require("../modals/ordersModal");

//Get All orders Route
const getOrders = asyncHandler(async (req, res) => {
  const orders = await ORDERS.find();
  res.status(200).json(orders);
});

// create Order
const createOrder = asyncHandler(async (req, res) => {
  const userInput = req.body.orderNo;
  if (userInput.length === 0) {
    res.status(400);
    throw new Error("Please enter some value");
  } else {
    const order = await ORDERS.create({
      orderNo: req.body.orderNo,
    });
    res.status(200).json(order);
  }
});

//upate ORder
const updateOrder = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update order ${req.params.id}` });
});

//delete Order this function is with try catch block
const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const deletedOrder = await ORDERS.findByIdAndDelete(req.params.id);
    if (deletedOrder) {
      res
        .status(200)
        .json({ message: `Deleted Order with ID ${req.params.id}` });
    } else {
      res.status(404);
      throw new Error("Order not Found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
