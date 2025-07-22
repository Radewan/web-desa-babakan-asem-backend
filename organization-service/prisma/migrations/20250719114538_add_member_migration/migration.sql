-- CreateEnum
CREATE TYPE "Organization" AS ENUM ('PEMERINTAH', 'PKK', 'KARANG_TARUNA', 'DPD');

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "position" VARCHAR(255) NOT NULL,
    "profile_photo" VARCHAR(255) NOT NULL,
    "termStart" INTEGER NOT NULL,
    "termEnd" INTEGER NOT NULL,
    "organization_type" "Organization" NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);
