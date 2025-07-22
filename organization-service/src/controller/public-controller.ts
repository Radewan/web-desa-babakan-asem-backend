import e, { Request, Response, NextFunction } from "express";
import { PublicService } from "../service/public-service";
import { Organization } from "@prisma/client";

export class PublicController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let organizationType: Organization | undefined = req.query
        .organizationType as Organization | undefined;
      if (req.query.organizationType === Organization.DPD) {
        organizationType = Organization.DPD;
      } else if (req.query.organizationType === Organization.KARANG_TARUNA) {
        organizationType = Organization.KARANG_TARUNA;
      } else if (req.query.organizationType === Organization.PEMERINTAH) {
        organizationType = Organization.PEMERINTAH;
      } else if (req.query.organizationType === Organization.PKK) {
        organizationType = Organization.PKK;
      } else if (req.query.organizationType === Organization.BPD) {
        organizationType = Organization.BPD;
      } else {
        organizationType = undefined;
      }
      let page = parseInt(req.query.page as string) || 1;
      let limit = parseInt(req.query.limit as string) || 10;
      const response = await PublicService.getAll(
        organizationType,
        page,
        limit
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
