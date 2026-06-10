import express from "express"
import * as productController from "../controllers/productController.js"
import { upload } from "../middleware/uploadMiddleware.js"

const router = express.Router();

router.get("/get", productController.getProducts);
router.get("/getProduct/:productId", productController.getproduct);
router.post("/create", upload.single("image"), productController.createproduct);
router.delete("/delete/:productId", productController.deleteproduct);
router.patch("/update/:productId", upload.single("image"), productController.updateproduct);

export default router
