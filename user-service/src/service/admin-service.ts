import { Role } from "@prisma/client";
import { prismaClient } from "../application/database";
import {
  toUserAllResponse,
  toUserResponse,
  UserCreateRequest,
} from "../model/user-model";
import { ResponseError } from "../error/response-error";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcryptjs";

export class AdminService {
  static async getAllUser(
    page: number,
    limit: number,
    role: Role,
    search?: string
  ) {
    const users = await prismaClient.user.findMany({
      where: {
        role: role,
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalUser = await prismaClient.user.count({});

    return toUserAllResponse(page, limit, totalUser, users);
  }
  static async createUser(request: UserCreateRequest) {
    Validation.validate(UserValidation.createUser, request);

    if (request.password !== request.confirm_password) {
      throw new ResponseError(
        400,
        "Password and confirm password do not match"
      );
    }

    const userWithSameEmail = await prismaClient.user.count({
      where: {
        email: request.email,
      },
    });

    if (userWithSameEmail !== 0) {
      throw new ResponseError(400, "Email already exists");
    }

    request.password = await bcrypt.hash(request.password, 10);

    const userCreate = await prismaClient.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: request.password,
        role: request.role,
      },
    });

    return { user: toUserResponse(userCreate) };
  }
  static async updateRole(userId: string, role: Role) {
    Validation.validate(UserValidation.updateRole, role);

    const userFind = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userFind) {
      throw new ResponseError(404, "User not found");
    }

    console.log(userFind.role, role);
    if (userFind.role === role) {
      throw new ResponseError(400, "User already has this role");
    }

    const userUpdateRole = await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });

    return { user: toUserResponse(userUpdateRole) };
  }
}
