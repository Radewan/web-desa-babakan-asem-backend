import { Organization } from "@prisma/client";
import { prismaClient } from "../application/database";

export class PublicService {
  static async getAll(
    organization?: Organization,
    page: number = 1,
    limit: number = 10
  ) {
    const members = await prismaClient.member.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        is_term: true,
        organization_type: organization ? organization : undefined,
      },
      orderBy: {
        important_level: "desc",
      },
    });
    const totalMembers = await prismaClient.member.count({
      where: {
        is_term: true,
        organization_type: organization ? organization : undefined,
      },
    });
    return {
      total_page: Math.ceil(totalMembers / limit),
      page,
      limit,
      members,
    };
  }
}
