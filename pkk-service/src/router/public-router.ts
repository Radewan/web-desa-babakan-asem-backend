import express from "express";
import { PublicController } from "../controller/public-controller";
export const publicRouter = express.Router();

publicRouter.get("/", PublicController.getAll);

