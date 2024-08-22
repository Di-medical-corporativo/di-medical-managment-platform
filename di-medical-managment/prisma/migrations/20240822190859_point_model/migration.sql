/*
  Warnings:

  - You are about to drop the column `description` on the `Invoce` table. All the data in the column will be lost.
  - You are about to drop the column `done` on the `Point` table. All the data in the column will be lost.
  - You are about to drop the column `sign` on the `Point` table. All the data in the column will be lost.
  - You are about to drop the column `truckId` on the `Point` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `Point` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `certificate` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observation` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ssa` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Point` table without a default value. This is not possible if the table is not empty.
  - Made the column `itineraryId` on table `Point` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comment` on table `Point` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_itineraryId_fkey";

-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_truckId_fkey";

-- AlterTable
ALTER TABLE "Invoce" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "done",
DROP COLUMN "sign",
DROP COLUMN "truckId",
ADD COLUMN     "certificate" TEXT NOT NULL,
ADD COLUMN     "observation" TEXT NOT NULL,
ADD COLUMN     "ssa" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "taskId" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "itineraryId" SET NOT NULL,
ALTER COLUMN "comment" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "belongsToItinerary" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Point_taskId_key" ON "Point"("taskId");

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
