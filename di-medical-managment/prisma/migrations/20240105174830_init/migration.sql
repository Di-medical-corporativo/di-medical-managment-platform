/*
  Warnings:

  - You are about to drop the column `active` on the `Point` table. All the data in the column will be lost.
  - Added the required column `scheduleDate` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoce" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "scheduleDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "active",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;
