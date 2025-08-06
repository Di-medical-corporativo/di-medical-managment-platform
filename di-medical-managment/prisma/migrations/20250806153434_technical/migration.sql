-- CreateTable
CREATE TABLE "Technical" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Technical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalBrand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TechnicalBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "technicalId" TEXT NOT NULL,

    CONSTRAINT "TechnicalCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalBrand_name_key" ON "TechnicalBrand"("name");

-- AddForeignKey
ALTER TABLE "Technical" ADD CONSTRAINT "Technical_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "TechnicalBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalCode" ADD CONSTRAINT "TechnicalCode_technicalId_fkey" FOREIGN KEY ("technicalId") REFERENCES "Technical"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
