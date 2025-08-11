/*
  Warnings:

  - The primary key for the `TechnicalCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TechnicalCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TechnicalCode" DROP CONSTRAINT "TechnicalCode_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TechnicalCode_pkey" PRIMARY KEY ("technicalId", "code");
