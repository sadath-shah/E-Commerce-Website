import express from "express"
import * as userController from "../controllers/userController.js"
const router = express.Router();
router.get("/get", userController.getUsers);
router.get("/getUser/:userId",userController.getUser)
router.post("/login", userController.authUser);
router.post("/register", userController.createUser);
router.delete("/delete/:userId",userController.deleteUser)
router.patch("/updateUser/:userId",userController.updateUser)

export default router