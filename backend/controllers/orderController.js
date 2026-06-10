import * as orderService from "../services/orderService.js";

const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderService.getOrders(userId);
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrder(orderId);
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.cancelOrder(orderId);
    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    await orderService.deleteOrder(orderId);
    res.status(200).json({
      success: true,
      message: "Order deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createOrder, getOrders, getAllOrders, getOrder, cancelOrder, deleteOrder };
