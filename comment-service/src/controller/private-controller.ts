import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { PrivateService } from "../service/private-service";

export class PrivateController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await PrivateService.create(req.body, req.params.targetId,req.user!);
      return res.status(201).json(response)
    } catch (error) {
      next(error);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await PrivateService.update(req.body, req.params.commentId, req.user!);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await PrivateService.delete(req.params.commentId, req.user!);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async deleteByTarget(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await PrivateService.deleteByTarget(req.params.targetId, req.user!);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async deleteByUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await PrivateService.deleteByUser(req.user!);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}