-- CreateTable
CREATE TABLE "Permit" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "decitionTakenAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "rejectionReason" TEXT,

    CONSTRAINT "Permit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Permit" ADD CONSTRAINT "Permit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
