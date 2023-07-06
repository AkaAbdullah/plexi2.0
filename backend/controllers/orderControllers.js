const asyncHandler = require("express-async-handler");
const ORDERS = require("../modals/ordersModal");

//Get All orders Route
const getOrders = asyncHandler(async (req, res) => {
  const orders = await ORDERS.find()
    .populate("orderCreatedBy", "userName") // Populate the "orderCreatedBy" field with the "userName" and "email" fields from the "USERS" collection
    .exec();
  res.status(200).json(orders);
});

// create Order
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderNo,
    orderId,
    orderDetails,
    tracking,
    cost,
    comments,
    completeMarked,
  } = req.body;
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

  // Set the date
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // Add leading zeros if necessary
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  let currentDate = `${formattedDay}-${formattedMonth}-${year}`;

  // Create the order
  const order = await ORDERS.create({
    orderNo,
    marketPlaceOrderId: orderId,
    orderDetails,
    orderCreatedBy: req.user.id,
    tracking,
    shippingCost: cost,
    createdAt: currentDate,
    comments,
    completeMarked,
  });

  res.status(201).json(order);
});

//CREATE ORDER DETAILS ROUTE

const addOrderDetails = asyncHandler(async (req, res) => {
  const order = await ORDERS.findOne(req.params.id);
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

//CREATE multi line order
const createMultipleOrders = async (req, res) => {
  try {
    const orderNumbers = req.body.orderNumbers;
    console.log(typeof req.body.orderNumbers);

    if (!orderNumbers || typeof orderNumbers !== "string") {
      return res.status(400).json({ error: "Invalid order numbers" });
    }

    const orderNumberArray = orderNumbers
      .split("\n")
      .filter((orderNo) => orderNo.trim() !== "");

    const ordersToCreate = orderNumberArray.map((orderNo) => ({
      orderNo,
      orderCreatedBy: req.user.id,
    }));

    const createdOrders = await ORDERS.insertMany(ordersToCreate);
    res.status(201).json(createdOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//API for counting doucments

const countDocuments = asyncHandler(async (req, res) => {
  try {
    const count = await ORDERS.countDocuments({});
    res.json({ count });
  } catch (error) {
    console.error("Failed to get the count of documents:", error);
    res.status(500).json({ error: "Failed to get the count of documents" });
  }
});

//API for Getting SINGLE ORDER
const getSingleOrder = asyncHandler(async (req, res) => {
  const id = req.body.id;
  const order = await ORDERS.findOne({ id });
  res.json({ order });
});

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  addOrderDetails,
  createMultipleOrders,
  countDocuments,
  getSingleOrder,
};
