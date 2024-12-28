-- AlterTable
ALTER TABLE "Permit" ADD COLUMN     "decitionTakenById" TEXT,
ALTER COLUMN "decitionTakenAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Permit" ADD CONSTRAINT "Permit_decitionTakenById_fkey" FOREIGN KEY ("decitionTakenById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
