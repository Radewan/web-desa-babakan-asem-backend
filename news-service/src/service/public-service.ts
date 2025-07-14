import axios from "axios";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { toNewsGetAllResponse } from "../model/news-model";

export class PublicService {
  static async getAll(page: number, limit: number) {
    const news = await prismaClient.news.findMany({
      where: {
        is_published: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });
    const totalMessages = await prismaClient.news.count({
      where: {
        is_published: true,
      },
    });
    return toNewsGetAllResponse(totalMessages, page, limit, news);
  }

  static async getById(newsId: string) {
    const news = await prismaClient.news.findUnique({
      where: { id: newsId, is_published: true },
    });
    if (!news) {
      throw new ResponseError(404, "News not found");
    }

    await prismaClient.news.update({
      where: news,
      data: {
        view_count: { increment: 1 },
      },
    });

    const comments = await axios.get(
      `http://localhost:3001/api/comments/${newsId}`
    );
    const user = await axios.get(
      `http://localhost:3002/api/users/${news.userId}`
    );
    return {
      user_created: user.data.user,
      news: news,
      comments: comments.data,
    };
  }
}
