import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { AuthService } from "../service/auth-service";

export class AuthController {
  static async getUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.getUser(req.user!);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.update(req.user!, req.body);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await AuthService.delete(req.user!, req.header("Authorization")!);
      return res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }
}
