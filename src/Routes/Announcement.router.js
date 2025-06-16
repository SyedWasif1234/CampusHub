import { Router } from "express";
import { authMiddleware, Check_Faculty  , Check_Faculty_Admin} from "../Middlewares/Auth.middleware.js";
import { create_Announcement, get_Announcement } from "../Controllers/Announcement.controller.js";


const router = Router();

router.post("/create-announcement",authMiddleware,Check_Faculty_Admin ,create_Announcement )
router.get("/get-announcement", authMiddleware , get_Announcement)

export default router