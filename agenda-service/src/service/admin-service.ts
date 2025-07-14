import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  AgendaCreateRequest,
  AgendaUpdateRequest,
  toAgendaGetAllResponse,
} from "../model/agenda-model";
import { UserResponse } from "../model/user-model";
import { AgendaValidation } from "../validation/agenda-validation";
import { Validation } from "../validation/validation";
import path from "node:path";
import fs from "node:fs/promises";
import axios from "axios";

export class AdminService {
  static async getOwn(
    user: UserResponse,
    page: number,
    limit: number,
    isPublished: boolean | undefined
  ) {
    const agenda = await prismaClient.agenda.findMany({
      where: {
        ...(isPublished !== undefined && { is_published: isPublished }),
        userId: user.id,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });
    const totalMessages = await prismaClient.agenda.count({
      where: {
        ...(isPublished !== undefined && { is_published: isPublished }),
        userId: user.id,
      },
    });
    return toAgendaGetAllResponse(totalMessages, page, limit, agenda);
  }
  static async create(
    request: AgendaCreateRequest,
    user: UserResponse,
    file?: Express.Multer.File
  ) {
    Validation.validate(AgendaValidation.create, request);

    if (!file) {
      throw new ResponseError(400, "Featured image is required");
    }

    const agenda = await prismaClient.agenda.create({
      data: {
        ...request,
        userId: user.id,
        featured_image: file.filename,
        ...(request.is_published === true && {
          published_at: new Date(),
        }),
      },
    });

    return { agenda: agenda };
  }
  static async update(
    request: AgendaUpdateRequest,
    user: UserResponse,
    agendaId: string,
    file?: Express.Multer.File
  ) {
    Validation.validate(AgendaValidation.update, request);

    const agenda = await prismaClient.agenda.findUnique({
      where: { id: agendaId },
    });

    if (!agenda) {
      throw new ResponseError(404, "Agenda not found");
    }

    if (agenda.userId !== user.id) {
      throw new ResponseError(403, "Forbidden");
    }

    if (file) {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "images",
        agenda.featured_image
      );
      await fs.unlink(filePath);
    }

    const agendaUpdate = await prismaClient.agenda.update({
      where: { id: agenda.id },
      data: {
        ...(request.title && { title: request.title }),
        ...(request.content && { content: request.content }),
        ...(request.is_published === true && {
          is_published: request.is_published,
          published_at: new Date(),
        }),
        ...(request.is_published === false && {
          is_published: request.is_published,
          published_at: null,
        }),
        ...(file && { featured_image: file.filename }),
      },
    });

    return { agenda: agendaUpdate };
  }
  static async delete(agendaId: string, user: UserResponse, token: string) {
    const agenda = await prismaClient.agenda.findUnique({
      where: { id: agendaId },
    });

    if (!agenda) {
      throw new ResponseError(404, "Agenda not found");
    }

    if (agenda.userId !== user.id) {
      throw new ResponseError(403, "Forbidden");
    }

    await axios.delete(
      `http://localhost:3001/api/comments/delete-by-target/${agendaId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const agendaDelete = await prismaClient.agenda.delete({
      where: { id: agendaId },
    });

    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "images",
      agenda.featured_image
    );

    await fs.unlink(filePath);

    return agendaDelete;
  }
  static async deleteByAdmin(user: UserResponse, token: string) {
    const agenda = await prismaClient.agenda.findMany({
      where: { userId: user.id },
    });

    await Promise.all(
      agenda.map((n) => {
        return axios.delete(
          `http://localhost:3001/api/comments/delete-by-target/${n.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      })
    );

    await prismaClient.agenda.deleteMany({
      where: { userId: user.id },
    });

    await Promise.all(
      agenda.map((n) => {
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          "images",
          n.featured_image
        );
        return fs.unlink(filePath);
      })
    );
  }
}
