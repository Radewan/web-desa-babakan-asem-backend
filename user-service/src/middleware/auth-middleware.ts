import { Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";
import { UserRequest } from "../type/user-request";
import { UserResponse } from "../model/user-model";
import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerAuthorization = req.header("Authorization");
    const token = headerAuthorization && headerAuthorization.split(" ")[1];

    if (!token) {
      throw new ResponseError(401, "Unauthorized");
    }

    const userResponse = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as UserResponse;

    const user = await prismaClient.user.count({
      where: { id: userResponse.id },
    });

    if (user !== 1) {
      throw new ResponseError(401, "Unauthorized");
    }

    req.user = userResponse as UserResponse;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
