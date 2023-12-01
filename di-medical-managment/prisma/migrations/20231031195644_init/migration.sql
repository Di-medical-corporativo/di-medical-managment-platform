/*
  Warnings:

  - A unique constraint covering the columns `[sucursalId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loginId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sucursalId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "loginId" TEXT NOT NULL,
ADD COLUMN     "sucursalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_sucursalId_key" ON "User"("sucursalId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "Sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
