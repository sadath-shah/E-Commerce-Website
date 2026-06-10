import Order from "../models/orderModel.js";

const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

const getOrders = async (userId) => {
  return await Order.find({ userId }).populate("userId", "name email");
};

const getAllOrders = async () => {
  return await Order.find().populate("userId", "name email");
};

const getOrder = async (orderId) => {
  return await Order.findById(orderId);
};

const cancelOrder = async (orderId) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status: "cancelled" },
    { new: true }
  );
};

const deleteOrder = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};

export { createOrder, getOrders, getAllOrders, getOrder, cancelOrder, deleteOrder };
