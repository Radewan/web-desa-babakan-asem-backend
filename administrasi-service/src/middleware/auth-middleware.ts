import { Response, NextFunction } from "express";
import { ResponseError } from "../error/response-error";
import axios from "axios";
import { UserRequest } from "../type/user-request";
import { UserResponse } from "../model/user-model";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerAuthorization = req.header("Authorization");

    if (!headerAuthorization) {
      throw new ResponseError(401, "Unauthorized");
    }

    const response = await axios.get("http://localhost:3001/api/users/", {
      headers: {
        Authorization: headerAuthorization,
      },
    });

    const user = response.data.user;

    if (!user) {
      throw new ResponseError(401, "Unauthorized");
    }

    req.user = user as UserResponse;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
