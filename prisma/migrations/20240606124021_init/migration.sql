-- CreateTable
CREATE TABLE "organizationConfiguration" (
    "organizationId" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizationConfiguration_pkey" PRIMARY KEY ("organizationId")
);
