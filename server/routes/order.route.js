import express from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import { createOrder, fetchAllOrders, fetchUserOrders, orderById, updateOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/createorder", verifyUser, createOrder)
router.get("/fetchuserorders", verifyUser, fetchUserOrders)
router.get("/fetchallorders", verifyUser, fetchAllOrders)
router.get("/orderbyid/:orderId", verifyUser, orderById)
router.put("/updateorder/:orderId", verifyUser, updateOrders)


export default router;