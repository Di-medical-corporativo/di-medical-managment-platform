-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userAssignedId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dueTo" TIMESTAMP(3) NOT NULL,
    "startedDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userAssignedId_fkey" FOREIGN KEY ("userAssignedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
