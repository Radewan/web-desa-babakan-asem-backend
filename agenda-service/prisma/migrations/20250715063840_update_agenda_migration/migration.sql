-- CreateEnum
CREATE TYPE "AgendaType" AS ENUM ('REGULAR', 'PKK', 'KARANG_TARUNA');

-- AlterTable
ALTER TABLE "agenda" ADD COLUMN     "type" "AgendaType" NOT NULL DEFAULT 'REGULAR';
