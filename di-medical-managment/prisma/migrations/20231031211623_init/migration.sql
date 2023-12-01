/*
  Warnings:

  - You are about to drop the column `userId` on the `Login` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Login_userId_key";

-- AlterTable
ALTER TABLE "Login" DROP COLUMN "userId";
