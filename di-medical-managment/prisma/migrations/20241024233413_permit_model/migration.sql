/*
  Warnings:

  - You are about to drop the column `rejectionReason` on the `Permit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Permit" DROP COLUMN "rejectionReason",
ADD COLUMN     "adminComment" TEXT;
