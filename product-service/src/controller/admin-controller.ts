import { Response, NextFunction, response } from "express";
import { UserRequest } from "../type/user-request";
import { AdminService } from "../service/admin-service";

export class AdminController {
  static async getCategories(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminService.getCategories();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async createCategory(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminService.createCategory(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async updateCategory(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminService.updateCategory(
        req.params.categoryId,
        req.body
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      await AdminService.deleteCategory(req.params.categoryId);
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }

  static async getOwn(req: UserRequest, res: Response, next: NextFunction) {
    try {
      let page = parseInt(req.query.page as string) || 1;
      let limit = parseInt(req.query.limit as string) || 10;
      if (isNaN(page)) {
        page = 1;
      }
      if (isNaN(limit)) {
        limit = 10;
      }
      const response = await AdminService.getOwn(req.user!, page, limit);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {

      const response = await AdminService.create(req.body, req.user!, req.file);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AdminService.update(
        req.body,
        req.user!,
        req.params.productId,
        req.file
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await AdminService.delete(
        req.params.productId,
        req.user!,
        req.header("Authorization")!
      );
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }
  static async deleteByAdmin(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      await AdminService.deleteByAdmin(req.user!, req.header("Authorization")!);
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }
}
