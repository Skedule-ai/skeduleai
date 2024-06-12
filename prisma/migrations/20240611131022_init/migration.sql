-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "availabilityConfiguration" (
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "workingDay" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availabilityConfiguration_pkey" PRIMARY KEY ("userId","organizationId")
);

-- CreateTable
CREATE TABLE "userConfiguration" (
    "userId" TEXT NOT NULL,
    "onBoardingModal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userConfiguration_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "bookingService" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookingService_pkey" PRIMARY KEY ("userId","organizationId")
);

-- CreateTable
CREATE TABLE "bookingDetails" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "guestUserId" INTEGER,
    "serviceId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookingDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guestUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneNumberVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guestUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bookingService_id_key" ON "bookingService"("id");

-- AddForeignKey
ALTER TABLE "bookingDetails" ADD CONSTRAINT "bookingDetails_guestUserId_fkey" FOREIGN KEY ("guestUserId") REFERENCES "guestUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookingDetails" ADD CONSTRAINT "bookingDetails_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "bookingService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
