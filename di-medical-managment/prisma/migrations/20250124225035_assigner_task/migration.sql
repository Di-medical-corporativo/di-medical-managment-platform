-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assignerId" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignerId_fkey" FOREIGN KEY ("assignerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
