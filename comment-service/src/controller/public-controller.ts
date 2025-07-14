import { Request, Response, NextFunction } from "express";
import { PublicService } from "../service/public-service";

export class PublicController {
  static async getByTargetId(req: Request, res: Response, next: NextFunction) {
    try {
      let page = parseInt(req.query.page as string) || 1;
      let limit = parseInt(req.query.limit as string) || 10;
      const response = await PublicService.getByTargetId(
        req.params.targetId,
        page,
        limit
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
