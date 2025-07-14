import { Request, Response, NextFunction } from "express";
import { PublicService } from "../service/public-service";

export class PublicController {
  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PublicService.getById(req.params.userId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
