import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { AuthController } from "../controller/auth-controller";
export const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.get("/", AuthController.getUser);
privateRouter.patch("/", AuthController.update);
privateRouter.delete("/", AuthController.delete);
