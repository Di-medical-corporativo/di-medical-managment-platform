/*
  Warnings:

  - The primary key for the `Itinerary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itineraryId` on the `Itinerary` table. All the data in the column will be lost.
  - The required column `id` was added to the `Itinerary` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `itineraryId` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Made the column `sucursalId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sucursalId_fkey";

-- AlterTable
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_pkey",
DROP COLUMN "itineraryId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Point" ADD COLUMN     "itineraryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sucursalId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "Sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
