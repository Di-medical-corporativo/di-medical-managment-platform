-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sucursalId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sucursalId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "Sucursal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
