/*
  Warnings:

  - Added the required column `title` to the `galeri` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "galeri" ADD COLUMN     "title" VARCHAR(255) NOT NULL;
