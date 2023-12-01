-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_loginId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "loginId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login"("id") ON DELETE SET NULL ON UPDATE CASCADE;
