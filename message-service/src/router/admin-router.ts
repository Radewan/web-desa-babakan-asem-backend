import express from "express";
import { MessageController } from "../controller/message-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { adminMiddleware } from "../middleware/admin-middleware";

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use(adminMiddleware);

adminRouter.get("/", MessageController.getAll);
adminRouter.patch("/:messageId", MessageController.update);
adminRouter.delete("/:messageId", MessageController.delete);
