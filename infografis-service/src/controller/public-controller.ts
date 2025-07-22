import { Request, Response, NextFunction } from "express";
import { PublicService } from "../service/public-service";

export class PublicController {
  static async getPenduduk(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PublicService.getPenduduk();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getIdm(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PublicService.getIdm();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getBansos(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PublicService.getBansos();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getSdgs(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PublicService.getSdgs();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getExtraIdm(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PublicService.getExtraIdm();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
