import { Request, Response, NextFunction } from "express";
import { PublicService } from "../service/public-service";
import { AgendaType } from "@prisma/client";

export class PublicController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let page = parseInt(req.query.page as string) || 1;
      let limit = parseInt(req.query.limit as string) || 10;
      let type = req.query.type as string | undefined;
      if (type === AgendaType.PKK) {
        type = AgendaType.PKK;
      } else if (type === AgendaType.KARANG_TARUNA) {
        type = AgendaType.KARANG_TARUNA;
      } else if (type === AgendaType.REGULAR) {
        type = AgendaType.REGULAR;
      } else {
        type = undefined;
      }
      const response = await PublicService.getAll(
        page,
        limit,
        type as AgendaType
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PublicService.getById(req.params.agendaId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
