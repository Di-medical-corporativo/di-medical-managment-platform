-- CreateTable
CREATE TABLE "Truck" (
    "id" TEXT NOT NULL,
    "plates" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "Truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "truckId" TEXT NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point" (
    "id" TEXT NOT NULL,
    "sign" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "truckId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoce" (
    "invoceId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pointId" TEXT NOT NULL,

    CONSTRAINT "Invoce_pkey" PRIMARY KEY ("invoceId")
);

-- CreateTable
CREATE TABLE "Itinerary" (
    "itineraryId" TEXT NOT NULL,
    "sucursalId" TEXT NOT NULL,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("itineraryId")
);

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoce" ADD CONSTRAINT "Invoce_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "Sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
