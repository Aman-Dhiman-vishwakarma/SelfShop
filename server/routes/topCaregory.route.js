import express from 'express';
import { getTopCategorys, updateSection } from '../controllers/topCategory.controller.js';
import { verifyUser } from '../middleware/verifyUser.js';

const router = express.Router();

router.get("/alltopcategorys", getTopCategorys);
router.put("/updatesection/:sectionId",verifyUser , updateSection);


export default router;
