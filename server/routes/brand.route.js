import express from "express";
import { getAllBrands } from "../controllers/brand.controller.js";
const router = express.Router();

router.get("/getallbrands", getAllBrands);


export default router;