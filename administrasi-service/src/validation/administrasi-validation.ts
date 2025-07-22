import { LayananType, OnlineType, PengantarType } from "@prisma/client";
import { z, ZodType } from "zod";

export class AdministrasiValidation {
  static online: ZodType = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(1, "Phone number is required"),
    type: z.nativeEnum(OnlineType),
  });

  static layanan: ZodType = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    message: z.string().min(1, "Message is required"),
    type: z.nativeEnum(LayananType),
  });

  static pengantar: ZodType = z.object({
    name: z.string().min(1, "Name is required"),
    nik: z.string().min(1, "NIK is required"),
    keterangan: z.string().min(1, "Keterangan is required"),
    type: z.nativeEnum(PengantarType),
  });
}
