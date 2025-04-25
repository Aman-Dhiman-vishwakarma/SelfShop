import express from "express";
import { addSlide, deleteSlide, getSlides } from "../controllers/slide.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { upload } from "../middleware/multer.middleware.js";


const router = express.Router();

router.post("/addslide", verifyUser, upload.single('slideImage'), addSlide);
router.get("/getallslide", getSlides);
router.delete("/deleteslide/:slideid", verifyUser, deleteSlide);

export default router;
