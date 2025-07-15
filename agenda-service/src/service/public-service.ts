import axios from "axios";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { toAgendaWithUserGetAllResponse } from "../model/agenda-model";
import { AgendaType } from "@prisma/client";

export class PublicService {
  static async getAll(page: number, limit: number, type: AgendaType) {
    const agenda = await prismaClient.agenda.findMany({
      where: {
        is_published: true,
        ...(type && { type: type }),
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });
    const totalAgenda = await prismaClient.agenda.count({
      where: {
        is_published: true,
        ...(type && { type: type }),
      },
    });
    const agendaWithUser = await Promise.all(
      agenda.map(async (agenda) => {
        const response = await axios.get(
          `http://localhost:3001/api/users/${agenda.userId}`
        );
        return {
          user_created: response.data.user,
          agenda: agenda,
        };
      })
    );
    return toAgendaWithUserGetAllResponse(
      totalAgenda,
      page,
      limit,
      agendaWithUser
    );
  }

  static async getById(agendaId: string) {
    const agenda = await prismaClient.agenda.findUnique({
      where: { id: agendaId, is_published: true },
    });
    if (!agenda) {
      throw new ResponseError(404, "Agenda not found");
    }

    await prismaClient.agenda.update({
      where: agenda,
      data: {
        view_count: { increment: 1 },
      },
    });

    const comments = await axios.get(
      `http://localhost:3001/api/comments/${agendaId}`
    );
    const user = await axios.get(
      `http://localhost:3002/api/users/${agenda.userId}`
    );
    return {
      user_created: user.data.user,
      agenda: agenda,
      comments: comments.data.comments,
    };
  }
}
