-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_itineraryId_fkey";

-- AlterTable
ALTER TABLE "Point" ALTER COLUMN "sign" DROP NOT NULL,
ALTER COLUMN "itineraryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
