import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { UserResponse } from "../model/user-model";
import path from "node:path";
import fs from "node:fs/promises";

export class AdminService {
  static async create(file?: Express.Multer.File) {
    if (!file) {
      throw new ResponseError(400, "Featured image is required");
    }

    const galeri = await prismaClient.galeri.create({
      data: {
        image: file.filename,
      },
    });

    return { galeri: galeri };
  }
  static async delete(galeriId: string) {
    const galeri = await prismaClient.galeri.findUnique({
      where: { id: galeriId },
    });

    if (!galeri) {
      throw new ResponseError(404, "Galeri not found");
    }

    const filePath = path.join(__dirname, "..", "..", "images", galeri.image);

    Promise.all([
      await prismaClient.galeri.delete({
        where: { id: galeriId },
      }),
      await fs.unlink(filePath),
    ]);
  }
}
