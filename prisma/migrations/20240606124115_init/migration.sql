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
    "workingHour" INTEGER NOT NULL,
    "workingMinute" INTEGER NOT NULL,
    "availableSlots" INTEGER NOT NULL,
    "workingDays" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availabilityConfiguration_pkey" PRIMARY KEY ("userId","organizationId")
);
