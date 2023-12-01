/*
  Warnings:

  - Added the required column `finishedDate` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Incident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "finishedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
