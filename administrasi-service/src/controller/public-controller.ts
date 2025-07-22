import { Request, Response, NextFunction } from "express";
import { PublicService } from "../service/public-service";

export class PublicController {
  static async online(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PublicService.online(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async layanan(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PublicService.layanan(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async pengantar(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PublicService.pengantar(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
