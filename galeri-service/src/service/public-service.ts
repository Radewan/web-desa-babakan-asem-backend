import { prismaClient } from "../application/database";
import { toGaleriGetAllResponse } from "../model/galeri-model";

export class PublicService {
  static async getAll(page: number, limit: number) {
    const galeri = await prismaClient.galeri.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });
    const totalGaleri = await prismaClient.galeri.count({});
    return toGaleriGetAllResponse(totalGaleri, page, limit, galeri);
  }
}
