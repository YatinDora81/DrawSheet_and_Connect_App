/*
  Warnings:

  - Changed the type of `expirayTime` on the `Opt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Opt" DROP COLUMN "expirayTime",
ADD COLUMN     "expirayTime" INTEGER NOT NULL;
