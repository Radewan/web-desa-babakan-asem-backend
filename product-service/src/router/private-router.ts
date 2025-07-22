import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { PrivateController } from "../controller/private-controller";

export const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.get("/rating/:productId", PrivateController.alreadyRated);
privateRouter.post("/rating/:productId", PrivateController.createRating);
