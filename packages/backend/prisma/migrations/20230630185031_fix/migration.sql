/*
  Warnings:

  - You are about to drop the column `date` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "date",
DROP COLUMN "password";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "date";

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
