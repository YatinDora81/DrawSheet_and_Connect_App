/*
  Warnings:

  - Made the column `join_code` on table `Room` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "join_code" SET NOT NULL;
