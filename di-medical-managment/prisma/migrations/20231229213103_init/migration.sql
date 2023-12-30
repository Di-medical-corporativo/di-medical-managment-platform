-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_responseId_fkey";

-- AlterTable
ALTER TABLE "Point" ALTER COLUMN "responseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "SurveyResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
