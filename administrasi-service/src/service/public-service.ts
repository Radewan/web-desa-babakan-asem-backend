import { prismaClient } from "../application/database";
import {
  LayananCreateRequest,
  OnlineCreateRequest,
  PengantarCreateRequest,
} from "../model/administrasi-model";
import { Validation } from "../validation/validation";
import { AdministrasiValidation } from "../validation/administrasi-validation";

export class PublicService {
  static async online(request: OnlineCreateRequest) {
    Validation.validate(AdministrasiValidation.online, request);
    const online = await prismaClient.online.create({
      data: request,
    });

    return { online: online };
  }

  static async layanan(request: LayananCreateRequest) {
    Validation.validate(AdministrasiValidation.layanan, request);
    const layanan = await prismaClient.layanan.create({
      data: request,
    });
    return { layanan: layanan };
  }

  static async pengantar(request: PengantarCreateRequest) {
    Validation.validate(AdministrasiValidation.pengantar, request);

    const pengantar = await prismaClient.pengantar.create({
      data: request,
    });
    return { pengantar: pengantar };
  }
}
