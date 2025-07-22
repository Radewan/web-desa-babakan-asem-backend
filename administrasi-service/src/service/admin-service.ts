import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class AdminService {
  static async updateOnline(id: string) {
    const onlineExists = await prismaClient.online.findUnique({
      where: { id },
    });
    if (!onlineExists) {
      throw new ResponseError(404, "Online request not found");
    }

    const updatedOnline = await prismaClient.online.update({
      where: { id },
      data: { is_pending: false }, // Example update, adjust as needed
    });

    return { online: updatedOnline };
  }

  static async updateLayanan(id: string) {
    const layananExists = await prismaClient.layanan.findUnique({
      where: { id },
    });
    if (!layananExists) {
      throw new ResponseError(404, "Layanan request not found");
    }

    const updatedLayanan = await prismaClient.layanan.update({
      where: { id },
      data: { is_pending: false }, // Example update, adjust as needed
    });

    return { layanan: updatedLayanan };
  }

  static async updatePengantar(id: string) {
    const pengantarExists = await prismaClient.pengantar.findUnique({
      where: { id },
    });
    if (!pengantarExists) {
      throw new ResponseError(404, "Pengantar request not found");
    }

    const updatedPengantar = await prismaClient.pengantar.update({
      where: { id },
      data: { is_pending: false }, // Example update, adjust as needed
    });

    return { pengantar: updatedPengantar };
  }

  static async getOnline(
    page: number,
    limit: number,
    isPending: boolean | null
  ) {
    const layanan = await prismaClient.online.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: isPending !== null ? { is_pending: isPending } : {},
    });

    const totalCount = await prismaClient.online.count({
      where: isPending !== null ? { is_pending: isPending } : {},
    });

    return {
      total_page: Math.ceil(totalCount / limit),
      page,
      limit,
      data: layanan,
    };
  }

  static async getLayanan(
    page: number,
    limit: number,
    isPending: boolean | null
  ) {
    const layanan = await prismaClient.layanan.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: isPending !== null ? { is_pending: isPending } : {},
    });

    const totalCount = await prismaClient.layanan.count({
      where: isPending !== null ? { is_pending: isPending } : {},
    });

    return {
      total_page: Math.ceil(totalCount / limit),
      page,
      limit,
      data: layanan,
    };
  }

  static async getPengantar(
    page: number,
    limit: number,
    isPending: boolean | null
  ) {
    const pengantar = await prismaClient.pengantar.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: isPending !== null ? { is_pending: isPending } : {},
    });

    const totalCount = await prismaClient.pengantar.count({
      where: isPending !== null ? { is_pending: isPending } : {},
    });

    return {
      total_page: Math.ceil(totalCount / limit),
      page,
      limit,
      data: pengantar,
    };
  }
}
