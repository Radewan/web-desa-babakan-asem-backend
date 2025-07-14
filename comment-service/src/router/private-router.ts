import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { PrivateController } from "../controller/private-controller";

export const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.post("/create/:targetId", PrivateController.create);
privateRouter.patch("/update/:commentId", PrivateController.update);
privateRouter.delete("/delete/:commentId", PrivateController.delete);

privateRouter.delete(
  "/delete-by-target/:targetId",
  PrivateController.deleteByTarget
);
privateRouter.delete("/delete-by-user", PrivateController.deleteByUser);
