import { Router } from "express";
import { authMiddleware, Check_Admin } from "../Middlewares/Auth.middleware.js";
import { change_user_role, list_all_users } from "../Controllers/Admin.controller.js";

const router = Router();

router.get("/users", authMiddleware ,  Check_Admin , list_all_users )
router.put("/users/:userId/role", authMiddleware , Check_Admin , change_user_role )

export default router