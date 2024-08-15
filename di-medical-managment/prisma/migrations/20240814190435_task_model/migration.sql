/*
  Warnings:

  - You are about to drop the column `userAssgnedPicture` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `userAssignedName` on the `Task` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userAssgnedPicture",
DROP COLUMN "userAssignedName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "startedDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Task_status_idx" ON "Task"("status");

-- CreateIndex
CREATE INDEX "Task_dueTo_idx" ON "Task"("dueTo");

-- CreateIndex
CREATE INDEX "Task_userAssignedId_idx" ON "Task"("userAssignedId");
