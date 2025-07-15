import {
  toUserResponse,
  UserForgotPasswordRequest,
  UserLoginRequest,
  UserRegisterRequest,
  UserResetPasswordRequest,
  UserResponse,
} from "../model/user-model";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";
import { ResponseError } from "../error/response-error";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database";
import { transporter } from "../application/nodemailer";
import { v4 as uuid } from "uuid";
import { User } from "@prisma/client";

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
    let token: string;
    if ((request as any).remember_me) {
      token = jwt.sign(userResponse, process.env.JWT_SECRET_KEY!, {
        expiresIn: "1Y",
      });
    } else {
      token = jwt.sign(userResponse, process.env.JWT_SECRET_KEY!, {
        expiresIn: "1W",
      });
    }

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
    let token: string;
    if ((request as any).remember_me) {
      token = jwt.sign(userResponse, process.env.JWT_SECRET_KEY!, {
        expiresIn: "1Y",
      });
    } else {
      token = jwt.sign(userResponse, process.env.JWT_SECRET_KEY!, {
        expiresIn: "1W",
      });
    }

    return {
      token: token,
      user: userResponse,
    };
  }

  static async forgotPassword(request: UserForgotPasswordRequest) {
    Validation.validate(UserValidation.forgotPassword, request);

    const user = await prismaClient.user.findUnique({
      where: { email: request.email },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const token = jwt.sign(
      toUserResponse(user),
      process.env.JWT_SECRET_KEY_RESET!,
      {
        expiresIn: "1h",
      }
    );

    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        reset_token: token,
        reset_token_expiry: new Date(Date.now() + 3600000),
      },
    });

    const resetLink = `http://localhost:3001/api/users/reset-password/${token}`;

    const mailOptions = {
      from: '"App Support" ranggadendiakun@gmail.com',
      to: request.email,
      subject: "Reset Password Desa Babakan Asem Conggeang",
      html: `<p>Klik link ini untuk reset password:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);
  }

  static async resetPassword(request: UserResetPasswordRequest, token: string) {
    Validation.validate(UserValidation.resetPassword, request);

    if (request.password !== request.confirm_password) {
      throw new ResponseError(400, "Passwords do not match");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_RESET!);
    } catch (error) {
      throw new ResponseError(400, "Invalid or expired token");
    }
    decoded = decoded as UserResponse;
    const user = await prismaClient.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const hashedPassword = await bcryptjs.hash(request.password, 10);

    await prismaClient.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { message: "Password reset successfully" };
  }
}
