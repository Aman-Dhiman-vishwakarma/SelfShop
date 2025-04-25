import express from "express";
import { checkOtp, register, resetPassword, sendOtpOnMail, signIn, signOut, verifyOtp } from "../controllers/auth.controller.js";
import { verifyUser } from "../middleware/verifyUser.js";
const router = express.Router();

router.post("/signup", register);
router.post("/verifyotp",verifyUser , verifyOtp);
router.post("/signin", signIn)
router.get("/signout", signOut)
router.post("/resetotpsend", sendOtpOnMail)
router.post("/checkotp", checkOtp)
router.post("/resetpassword", resetPassword)



export default router;