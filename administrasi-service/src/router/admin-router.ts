import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { AdminController } from "../controller/admin-controller";

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use(authMiddleware);

adminRouter.get("/online", AdminController.getOnline);
adminRouter.get("/layanan", AdminController.getLayanan);
adminRouter.get("/pengantar", AdminController.getPengantar);
adminRouter.patch("/online/:id", AdminController.updateOnline);
adminRouter.patch("/layanan/:id", AdminController.updateLayanan);
adminRouter.patch("/pengantar/:id", AdminController.updatePengantar);
