import { LayananType, OnlineType, PengantarType } from "@prisma/client";

export interface OnlineCreateRequest {
  name: string;
  email: string;
  phone: string;
  type: OnlineType;
}

export interface LayananCreateRequest {
  name: string;
  email: string;
  message: string;
  type: LayananType;
}

export interface PengantarCreateRequest {
  name: string;
  nik: string;
  keterangan: string;
  type: PengantarType;
}
