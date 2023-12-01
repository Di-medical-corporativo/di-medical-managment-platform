-- CreateTable
CREATE TABLE "UserHasRole" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UserHasRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- AddForeignKey
ALTER TABLE "UserHasRole" ADD CONSTRAINT "UserHasRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasRole" ADD CONSTRAINT "UserHasRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
