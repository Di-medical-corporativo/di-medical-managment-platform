/*
  Warnings:

  - Added the required column `active` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Point" ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "surveyId" TEXT;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE SET NULL ON UPDATE CASCADE;
