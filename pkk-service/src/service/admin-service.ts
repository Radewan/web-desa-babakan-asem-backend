import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Validation } from "../validation/validation";
import path from "node:path";
import fs from "node:fs/promises";
import { PkkCreateRequest, PkkUpdateRequest } from "../model/pkk-model";
import { PkkValidation } from "../validation/pkk-validation";

export class AdminService {
  static async create(request: PkkCreateRequest, file?: Express.Multer.File) {
    Validation.validate(PkkValidation.create, request);

    console.log("Request:", request);
    if (!file) {
      throw new ResponseError(400, "Featured image is required");
    }

    request.featured_image = file.filename;
    const program = await prismaClient.program.create({
      data: {
        ...request,
      },
    });

    return { program: program };
  }
  static async update(
    request: PkkUpdateRequest,
    programId: string,
    file?: Express.Multer.File
  ) {
    Validation.validate(PkkValidation.update, request);

    const program = await prismaClient.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      throw new ResponseError(404, "Program not found");
    }

    if (file) {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "images",
        program.featured_image
      );
      await fs.unlink(filePath);
    }

    const programUpdate = await prismaClient.program.update({
      where: { id: program.id },
      data: {
        ...request,
        featured_image: file ? file.filename : program.featured_image,
      },
    });

    return { program: programUpdate };
  }
  static async delete(programId: string) {
    const program = await prismaClient.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      throw new ResponseError(404, "Program not found");
    }

    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "images",
      program.featured_image
    );
    await fs.unlink(filePath);

    await prismaClient.program.delete({
      where: { id: programId },
    });
  }
}
