-- CreateEnum
CREATE TYPE "OnlineType" AS ENUM ('TRACKING_SURAT', 'CEK_STATUS_LAYANAN', 'PERMOHONAN');

-- CreateEnum
CREATE TYPE "LayananType" AS ENUM ('PENGADUAN', 'PERMOHONAN', 'LAINNYA');

-- CreateEnum
CREATE TYPE "PengantarType" AS ENUM ('KTP', 'KK', 'SKCK', 'LAINNYA');

-- CreateTable
CREATE TABLE "online" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" "OnlineType" NOT NULL,
    "is_pending" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "online_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "layanan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "LayananType" NOT NULL,
    "is_pending" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "layanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengantar" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "type" "PengantarType" NOT NULL,
    "keterangan" TEXT NOT NULL,
    "is_pending" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengantar_pkey" PRIMARY KEY ("id")
);
