import { toUserResponse } from "./../model/user-model";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class PublicService {
  static async getById(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new ResponseError(404, "User not found");
    }
    return { user: toUserResponse(user) };
  }
}
