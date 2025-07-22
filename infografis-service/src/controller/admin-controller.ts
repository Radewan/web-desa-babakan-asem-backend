import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { AdminService } from "../service/admin-service";

export class AdminController {
  static async updateExtraIdm(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminService.updateExtraIdm(
        req.body,
        req.params.id
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updatePenduduk(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminService.updatePenduduk(
        req.body,
        req.params.pendudukId
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createIdm(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AdminService.createIdm(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateIdm(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AdminService.updateIdm(req.params.idmId, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteIdm(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await AdminService.deleteIdm(req.params.idmId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  static async createBansos(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminService.createBansos(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateBansos(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response = await AdminService.updateBansos(
        req.params.bansosId,
        req.body
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBansos(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      await AdminService.deleteBansos(req.params.bansosId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  static async updateSdgs(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AdminService.updateSdgs(
        req.body,
        req.params.sdgId
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
