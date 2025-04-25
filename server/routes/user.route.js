import express from "express";
import { fetchUserById, getAllUsers, updateAdminUser, updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";
const router = express.Router();

router.get("/getuser", verifyUser, fetchUserById);
router.get("/getallusers", verifyUser, getAllUsers);
router.post("/updateuser", verifyUser, updateUser);
router.put("/updateadminuser/:userId", verifyUser, updateAdminUser);


export default router;