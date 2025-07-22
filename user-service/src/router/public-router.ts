import express from "express";
import { UserController } from "../controller/user-controller";
import { PublicController } from "../controller/public-controller";
export const publicRouter = express.Router();

publicRouter.post("/register", UserController.register);
publicRouter.post("/login", UserController.login);
publicRouter.post("/forgot-password", UserController.forgotPassword);
publicRouter.post("/verify-reset-token", UserController.verifyResetToken);
publicRouter.post("/reset-password", UserController.resetPassword);

publicRouter.get("/:userId", PublicController.getUserById);
