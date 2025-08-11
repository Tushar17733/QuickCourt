import express from "express";
import { signup, verifyOtp, login, logout, updateProfile } from "../controllers/authController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/signup",singleUpload, signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;

