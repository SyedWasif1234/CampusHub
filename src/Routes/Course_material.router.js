import { Router } from "express";
import { authMiddleware, Check_Admin, Check_Faculty } from "../Middlewares/Auth.middleware.js";
import { create_course, create_materials, course_Enrollment , get_course, get_material } from "../Controllers/Course_material.controller.js";

const router = Router()

router.post("/create-course" , authMiddleware , Check_Admin , create_course)
router.get("/get-courses" , authMiddleware , get_course)
router.post("/course-Erollment/:courseId", authMiddleware , course_Enrollment)

router.post("/create-materials/:courseId" , authMiddleware , Check_Faculty , create_materials)
router.get("/get-materials/:courseId" , authMiddleware  , get_material)


export default router


/*
GET /courses → All roles
POST /courses → Admin only
POST /courses/:courseId/materials → Faculty only
GET /courses/:courseId/materials → Students & faculty
*/