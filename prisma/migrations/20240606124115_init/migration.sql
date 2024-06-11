/*
  Warnings:

  - You are about to drop the `organizationConfiguration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "organizationConfiguration";

-- CreateTable
CREATE TABLE "availabilityConfiguration" (
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "workingDay" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availabilityConfiguration_pkey" PRIMARY KEY ("userId","organizationId")
);
