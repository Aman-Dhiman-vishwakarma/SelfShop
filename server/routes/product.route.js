import express from "express";
import { createProduct, deleteProduct, fetchProducts, fetchSimilerProducts, getBestsellerProduct, getResentProduct, productById, searchProduct, updateproduct } from "../controllers/product.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.post("/createproduct", verifyUser, upload.array('images', 12), createProduct);
router.get("/getproducts", fetchProducts);
router.get("/searchproducts", searchProduct);
router.get("/productbyid/:productId", productById);
router.get("/getsimilerproducts/:productId", fetchSimilerProducts);
router.get("/getresentproducts", getResentProduct);
router.get("/getbestsellerproducts", getBestsellerProduct);
router.put("/updateproduct/:productId", verifyUser, updateproduct);
router.delete("/deleteproduct/:productId",  verifyUser, deleteProduct)

export default router;

// upload.array('images', 12),

