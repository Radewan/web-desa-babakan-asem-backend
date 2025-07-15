import axios from "axios";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { toProductWithRatingGetAllResponse } from "../model/product-model";

export class PublicService {
  static async getAll(page: number, limit: number) {
    const products = await prismaClient.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
      include: {
        ratings: true,
      },
    });

    const producsWithRating = products.map((product) => {
      const averageRating =
        product.ratings.length > 0
          ? product.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
            product.ratings.length
          : 0;
      return {
        product: product,
        average_rating: averageRating,
      };
    });

    const totalProduct = await prismaClient.product.count({});
    return toProductWithRatingGetAllResponse(
      totalProduct,
      page,
      limit,
      producsWithRating
    );
  }

  static async getById(productId: string) {
    const product = await prismaClient.product.findUnique({
      where: { id: productId },
      include: {
        ratings: true,
      },
    });
    if (!product) {
      throw new ResponseError(404, "Product not found");
    }

    const averageRating =
      product.ratings.length > 0
        ? product.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
          product.ratings.length
        : 0;

    const comments = await axios.get(
      `http://localhost:3001/api/comments/${productId}`
    );
    const user = await axios.get(
      `http://localhost:3002/api/users/${product.user_id}`
    );
    return {
      user_created: user.data.user,
      rating: averageRating,
      product: product,
      comments: comments.data.comments,
    };
  }
}
