import express from "express";
import { createCategorySections, getCategorySection, updateCategorySections } from "../controllers/selectcategory.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/getsection", getCategorySection);
router.post("/createsection", verifyUser, createCategorySections);
router.put("/updatesection/:sectionId", verifyUser, updateCategorySections);

export default router;