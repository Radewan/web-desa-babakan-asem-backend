import express from "express";
import { adminMiddleware } from "../middleware/admin-middleware";
import { AdminController } from "../controller/admin-controller";
import { upload } from "../application/multer";
import { authMiddleware } from "../middleware/auth-middleware";

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use(adminMiddleware);

adminRouter.post("/", upload.single("featured_image"), AdminController.create);
adminRouter.patch(
  "/:programId",
  upload.single("featured_image"),
  AdminController.update
);
adminRouter.delete("/:programId", AdminController.delete);
