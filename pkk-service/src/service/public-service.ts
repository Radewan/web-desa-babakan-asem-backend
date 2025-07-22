
import { prismaClient } from "../application/database";

export class PublicService {
  static async getAll(page: number = 1, limit: number = 10) {
    const programs = await prismaClient.program.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });
    const totalProgram = await prismaClient.program.count({});
    return {
      total_page: Math.ceil(totalProgram / limit),
      page,
      limit,
      programs,
    };
  }
}
