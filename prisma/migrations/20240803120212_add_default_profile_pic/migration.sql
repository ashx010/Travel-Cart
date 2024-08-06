/*
  Warnings:

  - You are about to alter the column `profilePic` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Made the column `profilePic` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePic" SET NOT NULL,
ALTER COLUMN "profilePic" SET DEFAULT '/register_login/profileIcon.jpg',
ALTER COLUMN "profilePic" SET DATA TYPE VARCHAR(255);
