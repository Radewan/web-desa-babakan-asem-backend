import express from "express";
import { MessageController } from "../controller/message-controller";
export const publicRouter = express.Router();

publicRouter.post("/", MessageController.create);
