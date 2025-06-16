import { Router } from "express";
import { Generate_Api_key, LoginUser, RegisterUser, UserProfile } from "../Controllers/Auth.controller.js";
import { authMiddleware } from "../Middlewares/Auth.middleware.js";

const router = Router();


router.post("/register" , RegisterUser);
router.post("/login" , LoginUser);
router.post("/api-key" ,authMiddleware, Generate_Api_key);
router.get("/me", authMiddleware , UserProfile)

export default router