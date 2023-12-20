/*
  Warnings:

  - You are about to drop the `View` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ViewByResource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ViewByResource" DROP CONSTRAINT "ViewByResource_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ViewByResource" DROP CONSTRAINT "ViewByResource_viewId_fkey";

-- DropTable
DROP TABLE "View";

-- DropTable
DROP TABLE "ViewByResource";
