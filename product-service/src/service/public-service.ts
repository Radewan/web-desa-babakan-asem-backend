import axios from "axios";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { toProductGetAllResponse } from "../model/product-model";

export class PublicService {
  static async getAll(page: number, limit: number) {
    const products = await prismaClient.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });
    const totalProduct = await prismaClient.product.count({});
    return toProductGetAllResponse(totalProduct, page, limit, products);
  }

  static async getById(productId: string) {
    const product = await prismaClient.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new ResponseError(404, "Product not found");
    }

    const comments = await axios.get(
      `http://localhost:3001/api/comments/${productId}`
    );
    const user = await axios.get(
      `http://localhost:3002/api/users/${product.user_id}`
    );
    return {
      user_created: user.data.user,
      product: product,
      comments: comments.data,
    };
  }
}
