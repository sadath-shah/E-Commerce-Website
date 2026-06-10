import express from "express";
import * as orderController from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", orderController.createOrder);
router.get("/all", orderController.getAllOrders);
router.get("/user/:userId", orderController.getOrders);
router.get("/get/:orderId", orderController.getOrder);
router.patch("/cancel/:orderId", orderController.cancelOrder);
router.delete("/delete/:orderId", orderController.deleteOrder);

export default router;
