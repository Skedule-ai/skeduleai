/*
  Warnings:

  - You are about to drop the `booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_serviceId_fkey";

-- DropTable
DROP TABLE "booking";

-- DropTable
DROP TABLE "service";

-- CreateTable
CREATE TABLE "bookingService" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookingService_pkey" PRIMARY KEY ("userId","organizationId")
);

-- CreateTable
CREATE TABLE "bookingDetails" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookingDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bookingService_id_key" ON "bookingService"("id");

-- CreateIndex
CREATE UNIQUE INDEX "bookingService_id_userId_organizationId_key" ON "bookingService"("id", "userId", "organizationId");

-- AddForeignKey
ALTER TABLE "bookingDetails" ADD CONSTRAINT "bookingDetails_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "bookingService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
