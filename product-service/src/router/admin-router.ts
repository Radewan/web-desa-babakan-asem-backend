import express from "express";
import { adminMiddleware } from "../middleware/admin-middleware";
import { AdminController } from "../controller/admin-controller";
import { upload } from "../application/multer";
import { authMiddleware } from "../middleware/auth-middleware";

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use(adminMiddleware);

adminRouter.get("/categories", AdminController.getCategories);
adminRouter.post("/categories", AdminController.createCategory);
adminRouter.put("/categories/:categoryId", AdminController.updateCategory);
adminRouter.delete("/categories/:categoryId", AdminController.deleteCategory);

adminRouter.get("/me", AdminController.getOwn);
adminRouter.post(
  "/create",
  upload.single("featured_image"),
  AdminController.create
);
adminRouter.patch(
  "/update-by-product/:productId",
  upload.single("featured_image"),
  AdminController.update
);
adminRouter.delete("/delete-by-product/:productId", AdminController.delete);
adminRouter.delete("/delete-by-admin", AdminController.deleteByAdmin);
