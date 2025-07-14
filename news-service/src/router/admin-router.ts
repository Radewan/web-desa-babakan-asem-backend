import express from "express";
import { adminMiddleware } from "../middleware/admin-middleware";
import { AdminController } from "../controller/admin-controller";
import { upload } from "../application/multer";
import { authMiddleware } from "../middleware/auth-middleware";

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use(adminMiddleware);

adminRouter.get("/me", AdminController.getOwn);
adminRouter.post(
  "/create",
  upload.single("featured_image"),
  AdminController.create
);
adminRouter.patch(
  "/update-by-news/:newsId",
  upload.single("featured_image"),
  AdminController.update
);
adminRouter.delete("/delete-by-news/:newsId", AdminController.delete);
adminRouter.delete("/delete-by-admin", AdminController.deleteByAdmin);
