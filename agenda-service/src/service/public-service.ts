import axios from "axios";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { toAgendaGetAllResponse } from "../model/agenda-model";

export class PublicService {
  static async getAll(page: number, limit: number) {
    const agenda = await prismaClient.agenda.findMany({
      where: {
        is_published: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });
    const totalMessages = await prismaClient.agenda.count({
      where: {
        is_published: true,
      },
    });
    return toAgendaGetAllResponse(totalMessages, page, limit, agenda);
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
      comments: comments.data,
    };
  }
}
