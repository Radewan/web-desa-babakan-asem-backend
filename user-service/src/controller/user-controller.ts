import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user-service";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.login(req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.forgotPassword(req.body);
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }

  static async verifyResetToken(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.verifyResetToken(req.query.token as string);
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.resetPassword(req.body, req.query.token as string);
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }
}
