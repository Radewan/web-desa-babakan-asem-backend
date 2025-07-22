import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  toUserResponse,
  UserResponse,
  UserUpdateRequest,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import axios from "axios";

export class AuthService {
  static async getUser(user: UserResponse) {
    const userFind = await prismaClient.user.findUnique({
      where: { id: user.id },
    });

    if (!userFind) {
      throw new ResponseError(404, "User not found");
    }

    return { user: toUserResponse(userFind) };
  }
  static async update(user: UserResponse, request: UserUpdateRequest) {
    Validation.validate(UserValidation.update, request);

    const userFind = await prismaClient.user.findUnique({
      where: { id: user.id },
    });

    if (!userFind) {
      throw new ResponseError(404, "User not found");
    }

    if (request.password) {
      request.password = await bcryptjs.hash(request.password, 10);
    }

    if (request.email) {
      const emailExists = await prismaClient.user.count({
        where: {
          email: request.email,
          id: { not: user.id },
        },
      });

      if (emailExists !== 0) {
        throw new ResponseError(400, "Email already registered");
      }
    }

    const userUpdate = await prismaClient.user.update({
      where: { id: user.id },
      data: {
        ...(request.name && { name: request.name }),
        ...(request.email && { email: request.email }),
        ...(request.password && { password: request.password }),
      },
    });

    return { user: toUserResponse(userUpdate) };
  }
  static async delete(user: UserResponse, token: string) {
    if (user.role === "ADMIN") {
      await Promise.all([
        axios.delete("http://localhost:3001/api/news/admin/delete-by-admin", {
          headers: {
            Authorization: token,
          },
        }),
        axios.delete("http://localhost:3001/api/agenda/admin/delete-by-admin", {
          headers: {
            Authorization: token,
          },
        }),
        axios.delete(
          "http://localhost:3001/api/products/admin/delete-by-admin",
          {
            headers: {
              Authorization: token,
            },
          }
        ),
        axios.delete("http://localhost:3001/api/comments/delete-by-user", {
          headers: {
            Authorization: token,
          },
        }),
      ]);
    } else if (user.role === "REGULAR") {
      await axios.delete("http://localhost:3001/api/comments/delete-by-user", {
        headers: {
          Authorization: token,
        },
      });
    }

    await prismaClient.user.delete({
      where: { id: user.id },
    });
  }
}
