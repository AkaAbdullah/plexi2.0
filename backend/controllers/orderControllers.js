const asyncHandler = require("express-async-handler");
const ORDERS = require("../modals/ordersModal");
const ORDER_DETAILS = require("../modals/orderDetails");

//Get All orders Route
const getOrders = asyncHandler(async (req, res) => {
  const orders = await ORDERS.find()
    .populate("orderCreatedBy", "userName") // Populate the "orderCreatedBy" field with the "userName" and "email" fields from the "USERS" collection
    .exec();
  res.status(200).json(orders);
});

// create Order
const createOrder = asyncHandler(async (req, res) => {
  const { orderNo } = req.body;
  //cheking if the field is empty
  if (orderNo.length === 0) {
    res.status(400);
    throw new Error("Please Enter a Order Number");
  }

  // Checking if order already exists
  const orderExists = await ORDERS.findOne({ orderNo });
  if (orderExists) {
    res.status(400);
    throw new Error("Order already exists");
  }

  // Create the order
  const order = await ORDERS.create({
    orderNo,
    orderCreatedBy: req.user.id,
  });

  res.status(201).json(order);
});

//CREATE ORDER DETAILS ROUTE

const addOrderDetails = asyncHandler(async (req, res) => {
  const order = await ORDERS.fineOne(req.params.id);
  if (order) {
    res.status(200).json({
      orderNo: order.orderNo,
      createdby: order.orderCreatedBy,
    });
  } else {
    res.status(400);
    throw new Error("no order found");
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
  addOrderDetails,
};
