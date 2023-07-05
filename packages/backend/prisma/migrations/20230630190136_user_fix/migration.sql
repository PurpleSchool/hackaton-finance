/*
  Warnings:

  - You are about to drop the column `userId` on the `Currency` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_userId_fkey";

-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "userId";
