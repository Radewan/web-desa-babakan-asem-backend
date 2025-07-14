import {
  toUserResponse,
  UserLoginRequest,
  UserRegisterRequest,
} from "../model/user-model";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";
import { ResponseError } from "../error/response-error";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database";
import { transporter } from "../application/nodemailer";
import { v4 as uuid } from "uuid";

export class UserService {
  static async register(request: UserRegisterRequest) {
    Validation.validate(UserValidation.register, request);

    if (request.password !== request.confirm_password) {
      throw new ResponseError(400, "Passwords do not match");
    }

    const findUserWithSameEmail = await prismaClient.user.count({
      where: {
        email: request.email,
      },
    });

    if (findUserWithSameEmail !== 0) {
      throw new ResponseError(400, "Email already registered");
    }

    request.password = await bcryptjs.hash(request.password, 10);

    const user = await prismaClient.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: request.password,
        role: "REGULAR",
      },
    });

    const userResponse = toUserResponse(user);
    const token = jwt.sign(userResponse, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1w",
    });

    return {
      token: token,
      user: userResponse,
    };
  }

  static async login(request: UserLoginRequest) {
    Validation.validate(UserValidation.login, request);

    const user = await prismaClient.user.findUnique({
      where: { email: request.email },
    });

    if (!user || !(await bcryptjs.compare(request.password, user.password))) {
      throw new ResponseError(400, "Invalid email or password");
    }

    const userResponse = toUserResponse(user);
    const token = jwt.sign(userResponse, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1w",
    });

    return {
      token: token,
      user: userResponse,
    };
  }

  static async forgotPassword(request: { email: string }) {
    Validation.validate(UserValidation.forgotPassword, request);

    const user = await prismaClient.user.findUnique({
      where: { email: request.email },
    });

    if (user) {
      const mailOptions = {
        from: "ranggadendiakun@gmail.com",
        to: request.email,
        subject: "Reset Password Desa Babakan Asem Conggeang",
        text: "Ini adalah email percobaan yang dikirim menggunakan Nodemailer!",
      };

      await transporter.sendMail(mailOptions);
    }
    return { message: "Password reset link sent" };
  }
}
