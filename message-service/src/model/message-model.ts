import { Message } from "@prisma/client";

export interface MessageCreateRequest {
  name: string;
  email: string;
  message: string;
}

export interface MessageGetAllResponse {
  total_page: number;
  page: number;
  limit: number;
  messages: Message[];
}

export const toMessageGetAllResponse = (
  total_page: number,
  page: number,
  limit: number,
  messages: Message[]
): MessageGetAllResponse => {
  return {
    total_page: Math.ceil(total_page / limit),
    page,
    limit,
    messages,
  };
};
