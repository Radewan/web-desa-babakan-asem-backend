/*
  Warnings:

  - You are about to drop the column `termEnd` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `termStart` on the `members` table. All the data in the column will be lost.
  - Added the required column `term_end` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term_start` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" DROP COLUMN "termEnd",
DROP COLUMN "termStart",
ADD COLUMN     "term_end" INTEGER NOT NULL,
ADD COLUMN     "term_start" INTEGER NOT NULL;
