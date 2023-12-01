/*
  Warnings:

  - A unique constraint covering the columns `[loginId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Login" DROP CONSTRAINT "Login_userId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "User_loginId_key" ON "User"("loginId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
