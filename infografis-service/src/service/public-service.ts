import axios from "axios";
import { prismaClient } from "../application/database";

export class PublicService {
  static async getPenduduk() {
    const resident = await prismaClient.resident.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return { resident: resident };
  }
  static async getIdm() {
    const idm = await prismaClient.idm.findMany({
      orderBy: {
        year: "asc",
      },
    });

    return { idm: idm };
  }

  static async getBansos() {
    const bansos = await prismaClient.socialAssistance.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return { bansos: bansos };
  }

  static async getSdgs() {
    const sdgs = await prismaClient.sdgs.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return { sdgs: sdgs };
  }
  static async getExtraIdm() {
    const extraIdm = await prismaClient.extraIdm.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return { extraIdm: extraIdm };
  }
}
