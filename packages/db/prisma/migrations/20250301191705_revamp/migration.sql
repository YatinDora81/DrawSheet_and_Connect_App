/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `members` on the `Room` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_createdBy_fkey";

-- DropIndex
DROP INDEX "Room_roomName_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "createdBy",
DROP COLUMN "members",
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "roomPic" TEXT;

-- CreateTable
CREATE TABLE "UserRoom" (
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "UserRoom_pkey" PRIMARY KEY ("userId","roomId")
);

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoom" ADD CONSTRAINT "UserRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoom" ADD CONSTRAINT "UserRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
