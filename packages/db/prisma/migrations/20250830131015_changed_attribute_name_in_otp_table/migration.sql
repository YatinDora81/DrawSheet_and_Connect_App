/*
  Warnings:

  - You are about to drop the column `isUser` on the `Opt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Opt" DROP COLUMN "isUser",
ADD COLUMN     "isUsed" BOOLEAN NOT NULL DEFAULT false;
