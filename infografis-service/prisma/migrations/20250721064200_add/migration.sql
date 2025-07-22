/*
  Warnings:

  - You are about to drop the column `children` on the `residents` table. All the data in the column will be lost.
  - You are about to drop the column `head_of_family` on the `residents` table. All the data in the column will be lost.
  - You are about to drop the column `man` on the `residents` table. All the data in the column will be lost.
  - You are about to drop the column `woman` on the `residents` table. All the data in the column will be lost.
  - Added the required column `amount` to the `residents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `residents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "residents" DROP COLUMN "children",
DROP COLUMN "head_of_family",
DROP COLUMN "man",
DROP COLUMN "woman",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
