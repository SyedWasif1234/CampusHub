import { Router } from "express";
import { authMiddleware, Check_Admin, Check_Faculty, Check_Faculty_Admin } from "../Middlewares/Auth.middleware.js";
import { createResult, get_any_student_result, get_own_result } from "../Controllers/Results.controller.js";

const router = Router();

router.post("/create-results" , authMiddleware , Check_Admin , createResult)
router.get("/get-result/:userId " , authMiddleware , get_own_result)
router.get("get-results", authMiddleware , Check_Faculty_Admin , get_any_student_result)

export default router



