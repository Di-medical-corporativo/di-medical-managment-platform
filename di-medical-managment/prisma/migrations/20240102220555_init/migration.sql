/*
  Warnings:

  - Added the required column `active` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "active" BOOLEAN NOT NULL;
