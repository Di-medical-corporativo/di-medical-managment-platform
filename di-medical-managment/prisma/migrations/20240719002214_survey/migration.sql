/*
  Warnings:

  - You are about to drop the column `typeId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `beginDate` on the `SurveyResponse` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `SurveyResponse` table. All the data in the column will be lost.
  - You are about to drop the `QuestionType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Survey` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_typeId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "typeId",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "endDate",
DROP COLUMN "name",
DROP COLUMN "startDate",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SurveyResponse" DROP COLUMN "beginDate",
DROP COLUMN "endDate";

-- DropTable
DROP TABLE "QuestionType";
