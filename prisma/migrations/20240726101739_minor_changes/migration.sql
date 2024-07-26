/*
  Warnings:

  - You are about to drop the column `profile_pic` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_pic",
ADD COLUMN     "profilePic" TEXT;

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
