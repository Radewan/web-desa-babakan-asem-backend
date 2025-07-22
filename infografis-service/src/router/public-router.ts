import express from "express";
import { PublicController } from "../controller/public-controller";
export const publicRouter = express.Router();

publicRouter.get("/penduduk", PublicController.getPenduduk);
publicRouter.get("/idm", PublicController.getIdm);
publicRouter.get("/bansos", PublicController.getBansos);
publicRouter.get("/sdg", PublicController.getSdgs);

publicRouter.get("/extra-idm", PublicController.getExtraIdm);