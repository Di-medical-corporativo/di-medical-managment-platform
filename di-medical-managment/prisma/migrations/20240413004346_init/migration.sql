/*
  Warnings:

  - Added the required column `userAssgnedPicture` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAssignedName` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "userAssgnedPicture" TEXT NOT NULL,
ADD COLUMN     "userAssignedName" TEXT NOT NULL;
