import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { adminMiddleware } from "../middleware/admin-middleware";
import { AdminController } from "../controller/admin-controller";

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);
adminRouter.use(adminMiddleware);

adminRouter.patch("/penduduk/:pendudukId", AdminController.updatePenduduk);
adminRouter.post("/idm/", AdminController.createIdm);
adminRouter.patch("/idm/:idmId", AdminController.updateIdm);
adminRouter.delete("/idm/:idmId", AdminController.deleteIdm);
adminRouter.post("/bansos/", AdminController.createBansos);
adminRouter.patch("/bansos/:bansosId", AdminController.updateBansos);
adminRouter.delete("/bansos/:bansosId", AdminController.deleteBansos);
adminRouter.patch("/sdg/:sdgId", AdminController.updateSdgs);

adminRouter.patch("/extra-idm/:id", AdminController.updateExtraIdm);
