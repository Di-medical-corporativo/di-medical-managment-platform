-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "NSS" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Login" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sucursal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dimedicalBrand" TEXT NOT NULL,

    CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "View" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViewByResource" (
    "resourceId" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,

    CONSTRAINT "ViewByResource_pkey" PRIMARY KEY ("viewId","resourceId")
);

-- CreateTable
CREATE TABLE "ResourcesByRole" (
    "roleId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "ResourcesByRole_pkey" PRIMARY KEY ("roleId","resourceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Login_userId_key" ON "Login"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "View_slug_key" ON "View"("slug");

-- AddForeignKey
ALTER TABLE "Login" ADD CONSTRAINT "Login_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewByResource" ADD CONSTRAINT "ViewByResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewByResource" ADD CONSTRAINT "ViewByResource_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "View"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesByRole" ADD CONSTRAINT "ResourcesByRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourcesByRole" ADD CONSTRAINT "ResourcesByRole_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
