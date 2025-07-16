import { TargetType } from "@prisma/client";
import {
  CommentCreateRequest,
  CommentUpdateRequest,
} from "../model/comment-model";
import { UserResponse } from "../model/user-model";
import { CommentValidation } from "../validation/comment-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import axios from "axios";

export class PrivateService {
  static async create(
    request: CommentCreateRequest,
    targetId: string,
    user: UserResponse
  ) {
    Validation.validate(CommentValidation.create, request);

    if (request.target_type === TargetType.NEWS) {
      await axios.get(`http://localhost:3001/api/news/${targetId}`);
    } else if (request.target_type === TargetType.AGENDA) {
      await axios.get(`http://localhost:3001/api/agenda/${targetId}`);
    }
    const comment = await prismaClient.comment.create({
      data: {
        ...request,
        user_id: user.id,
        target_id: targetId,
      },
    });

    return { comment: comment };
  }
  static async update(
    request: CommentUpdateRequest,
    commentId: string,
    user: UserResponse
  ) {
    Validation.validate(CommentValidation.update, request);

    const comment = await prismaClient.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new ResponseError(404, "Comment not found");
    }

    if (comment.user_id !== user.id) {
      throw new ResponseError(
        403,
        "You are not authorized to update this comment"
      );
    }

    const commentUpdate = await prismaClient.comment.update({
      where: comment,
      data: {
        ...request,
      },
    });

    return { comment: commentUpdate };
  }
  static async delete(commentId: string, user: UserResponse) {
    const comment = await prismaClient.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new ResponseError(404, "Comment not found");
    }

    if (comment.user_id !== user.id) {
      throw new ResponseError(
        403,
        "You are not authorized to delete this comment"
      );
    }

    const commentDelete = await prismaClient.comment.delete({
      where: { id: commentId },
    });

    return { comment: commentDelete };
  }
  static async deleteByTarget(
    targetId: string,
    user: UserResponse,
    targetType: string
  ) {
    if (targetType === TargetType.NEWS) {
      const news = await axios.get(
        `http://localhost:3001/api/news/${targetId}`
      );
      if (news.data.news.userId !== user.id) {
        throw new ResponseError(
          403,
          "You are not authorized to delete comments for this target"
        );
      }
    } else if (targetType === TargetType.AGENDA) {
      console.log("Fetching agenda for target ID:", targetId);

      const agenda = await axios.get(
        `http://localhost:3001/api/agenda/${targetId}`
      );
      if (agenda.data.agenda.userId !== user.id) {
        throw new ResponseError(
          403,
          "You are not authorized to delete comments for this target"
        );
      }
    } else if (targetType === TargetType.PRODUCT) {
      const product = await axios.get(
        `http://localhost:3001/api/product/${targetId}`
      );
      if (product.data.product.userId !== user.id) {
        throw new ResponseError(
          403,
          "You are not authorized to delete comments for this target"
        );
      }
    } else {
      throw new ResponseError(400, "Invalid target type");
    }

    await prismaClient.comment.deleteMany({
      where: {
        target_id: targetId,
      },
    });

    return { message: "Comments deleted successfully" };
  }
  static async deleteByUser(user: UserResponse) {
    await prismaClient.comment.deleteMany({
      where: { user_id: user.id },
    });

    return { message: "Comments deleted successfully" };
  }
}
