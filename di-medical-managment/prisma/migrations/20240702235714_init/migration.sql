/*
  Warnings:

  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourcesByRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserHasRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResourcesByRole" DROP CONSTRAINT "ResourcesByRole_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourcesByRole" DROP CONSTRAINT "ResourcesByRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserHasRole" DROP CONSTRAINT "UserHasRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserHasRole" DROP CONSTRAINT "UserHasRole_userId_fkey";

-- DropTable
DROP TABLE "Resource";

-- DropTable
DROP TABLE "ResourcesByRole";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "UserHasRole";
