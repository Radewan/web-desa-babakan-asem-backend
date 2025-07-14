import { Agenda } from "@prisma/client";

export interface AgendaCreateRequest {
  title: string;
  content: string;
  location: string;
  start_time: Date | string; // ISO 8601 format
  end_time: Date | string; // ISO 8601 format
  is_published?: boolean;
}
export interface AgendaUpdateRequest {
  title?: string;
  content?: string;
  is_published?: boolean;
}

export interface AgendaGetAllResponse {
  total_page: number;
  page: number;
  limit: number;
  agenda: Agenda[];
}

export const toAgendaGetAllResponse = (
  total_page: number,
  page: number,
  limit: number,
  agenda: Agenda[]
): AgendaGetAllResponse => {
  return {
    total_page: Math.ceil(total_page / limit),
    page,
    limit,
    agenda,
  };
};
