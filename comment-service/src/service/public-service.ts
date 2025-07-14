import axios from "axios";
import { prismaClient } from "../application/database";

export class PublicService {
  static async getByTargetId(targetId: string, page: number, limit: number) {
    const comments = await prismaClient.comment.findMany({
      where: {
        target_id: targetId,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const enrichedComments = await Promise.all(
      comments.map(async (comment) => {
        const response = await axios.get(
          `http://localhost:3001/api/users/${comment.user_id}`
        );
        return {
          ...comment,
          ...response.data,
        };
      })
    );

    return { enrichedComments };
  }
}
