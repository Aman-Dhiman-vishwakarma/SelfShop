import express from "express";
import { addToCart, deleteCartItem, deleteUserCartItem, fetchUserCartProducts } from "../controllers/cart.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";
const router = express.Router();

router.post("/addtocart/:productId", verifyUser, addToCart);
router.get("/fetchcartproducts", verifyUser, fetchUserCartProducts);
router.delete("/deletecartItem/:productId", verifyUser, deleteCartItem);
router.delete("/deleteUsercartItem", verifyUser, deleteUserCartItem);


export default router;