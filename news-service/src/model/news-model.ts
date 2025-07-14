import { News } from "@prisma/client";

export interface NewsCreateRequest {
  title: string;
  content: string;
  is_published?: boolean;
}
export interface NewsUpdateRequest {
  title?: string;
  content?: string;
  is_published?: boolean;
}

export interface NewsGetAllResponse {
  total_page: number;
  page: number;
  limit: number;
  news: News[];
}

export const toNewsGetAllResponse = (
  total_page: number,
  page: number,
  limit: number,
  news: News[]
): NewsGetAllResponse => {
  return {
    total_page: Math.ceil(total_page / limit),
    page,
    limit,
    news,
  };
};