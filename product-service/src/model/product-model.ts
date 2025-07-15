import { Product } from "@prisma/client";

export interface ProductCreateRequest {
  category_id: string;
  title: string;
  description: string;
  price: number;
  link_whatsapp: string;
}

export interface ProductUpdateRequest {
  category_id?: string;
  title?: string;
  description?: string;
  price?: number;
  link_whatsapp?: string;
}

export interface ProductGetAllResponse {
  total_page: number;
  page: number;
  limit: number;
  products: Product[];
}

export const toProductGetAllResponse = (
  total_page: number,
  page: number,
  limit: number,
  products: Product[]
): ProductGetAllResponse => {
  return {
    total_page: Math.ceil(total_page / limit),
    page,
    limit,
    products,
  };
};
