import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { AdminService } from "../service/admin-service";

export class AdminController {
  static async getOnline(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      let isPending: boolean | null = null;
      if (req.query.isPending == "true") {
        isPending = true;
      } else if (req.query.isPending == "false") {
        isPending = false;
      }
      const response = await AdminService.getOnline(page, limit, isPending);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getLayanan(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      let isPending: boolean | null = null;
      if (req.query.isPending == "true") {
        isPending = true;
      } else if (req.query.isPending == "false") {
        isPending = false;
      }
      const response = await AdminService.getLayanan(page, limit, isPending);
      console.log(response);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getPengantar(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      let isPending: boolean | null = null;
      if (req.query.isPending == "true") {
        isPending = true;
      } else if (req.query.isPending == "false") {
        isPending = false;
      }
      const response = await AdminService.getPengantar(page, limit, isPending);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateOnline(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminService.updateOnline(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateLayanan(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminService.updateLayanan(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updatePengantar(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminService.updatePengantar(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
