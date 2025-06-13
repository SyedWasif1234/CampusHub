import { Router } from "express";
import { Generate_Api_key, LoginUser, RegisterUser, UserProfile } from "../Controllers/Auth.controller.js";
import { authMiddelware } from "../Middelwares/auth.middleware.js";

const router = Router();


router.post("/register" , RegisterUser);
router.post("/login" , LoginUser);
router.post("/api-key" ,authMiddelware, Generate_Api_key);
router.get("/me", authMiddelware , UserProfile)

export default router