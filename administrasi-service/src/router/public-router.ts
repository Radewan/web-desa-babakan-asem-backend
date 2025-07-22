import express from "express";
import { PublicController } from "../controller/public-controller";
export const publicRouter = express.Router();

publicRouter.post("/online", PublicController.online);
publicRouter.post("/layanan", PublicController.layanan);
publicRouter.post("/pengantar", PublicController.pengantar);
