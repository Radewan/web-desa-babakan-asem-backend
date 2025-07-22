import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { PrivateService } from "../service/private-service";

export class PrivateController {
  static async alreadyRated(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await PrivateService.alreadyRated(
        req.params.productId,
        req.user!
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createRating(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await PrivateService.createRating(
        req.body,
        req.params.productId,
        req.user!
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
