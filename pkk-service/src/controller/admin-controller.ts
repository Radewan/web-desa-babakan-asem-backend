import { Response, NextFunction, response } from "express";
import { UserRequest } from "../type/user-request";
import { AdminService } from "../service/admin-service";

export class AdminController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AdminService.create(req.body, req.file);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AdminService.update(
        req.body,
        req.params.programId,
        req.file
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await AdminService.delete(req.params.programId);
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }
}
