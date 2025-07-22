import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { adminMiddleware } from "../middleware/admin-middleware";
import { AdminController } from "../controller/admin-controller";
import { upload } from "../application/multer";

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use(adminMiddleware);

adminRouter.post(
  "/members",
  upload.single("profile_photo"),
  AdminController.createMember
);
adminRouter.patch(
  "/members/:memberId",
  upload.single("profile_photo"),
  AdminController.updateMember
);
adminRouter.delete("/members/:memberId", AdminController.deleteMember);

adminRouter.get("/members", AdminController.getAllMembers);
