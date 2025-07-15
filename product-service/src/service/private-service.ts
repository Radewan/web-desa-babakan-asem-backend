import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { UserResponse } from "../model/user-model";
import { RatingValidation } from "../validation/rating-validation";
import { Validation } from "../validation/validation";

export class PrivateService {
  static async createRating(
    request: { rating: number },
    productId: string,
    user: UserResponse
  ) {
    Validation.validate(RatingValidation.create, request);
    const product = await prismaClient.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new ResponseError(404, "Product not found");
    }

    const ratingExists = await prismaClient.rating.findFirst({
      where: {
        user_id: user.id,
        product_id: productId,
      },
    });

    if (ratingExists) {
      throw new ResponseError(
        400,
        "You already rating already for this product"
      );
    }

    const rating = await prismaClient.rating.create({
      data: {
        user_id: user.id,
        product_id: productId,
        rating: request.rating,
      },
    });

    return { rating: rating };
  }
}
