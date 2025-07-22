import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { adminMiddleware } from "../middleware/admin-middleware";
import { AdminController } from "../controller/admin-controller";

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use(adminMiddleware);

adminRouter.get("/admin/user", AdminController.getAllUser);
adminRouter.post("/admin", AdminController.createUser);
adminRouter.patch("/admin/:userId", AdminController.updateRole);
