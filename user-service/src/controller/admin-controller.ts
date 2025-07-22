import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { AdminService } from "../service/admin-service";
import { Role } from "@prisma/client";

export class AdminController {
  static async getAllUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      let page = parseInt(req.query.page as string) || 1;
      let limit = parseInt(req.query.limit as string) || 10;
      const users = await AdminService.getAllUser(page, limit);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  static async createUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AdminService.createUser(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async updateRole(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const updatedUser = await AdminService.updateRole(
        req.params.userId,
        req.body.role
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}
