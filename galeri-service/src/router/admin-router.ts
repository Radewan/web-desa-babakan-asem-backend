import express from "express";
import { adminMiddleware } from "../middleware/admin-middleware";
import { AdminController } from "../controller/admin-controller";
import { upload } from "../application/multer";
import { authMiddleware } from "../middleware/auth-middleware";

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use(adminMiddleware);

adminRouter.post("/", upload.single("image"), AdminController.create);
adminRouter.put("/:galeriId", upload.single("image"), AdminController.update);
adminRouter.delete("/:galeriId", AdminController.delete);
