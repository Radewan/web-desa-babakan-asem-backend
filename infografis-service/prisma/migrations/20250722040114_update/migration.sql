-- CreateEnum
CREATE TYPE "StatusDesa" AS ENUM ('MAJU', 'BERKEMBANG', 'MANDIRI', 'TERTINGGAL', 'SANGAT_TERTINGGAL');

-- CreateTable
CREATE TABLE "extra_idms" (
    "id" TEXT NOT NULL,
    "status_desa" "StatusDesa" NOT NULL,
    "sosial" DOUBLE PRECISION NOT NULL,
    "ekonomi" DOUBLE PRECISION NOT NULL,
    "lingkungan" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "extra_idms_pkey" PRIMARY KEY ("id")
);
