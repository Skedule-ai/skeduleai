-- CreateTable
CREATE TABLE "organizationDetails" (
    "id" SERIAL NOT NULL,
    "typeOfOrganization" TEXT NOT NULL,
    "servicesOffered" TEXT NOT NULL,
    "aboutOrganization" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizationDetails_pkey" PRIMARY KEY ("id")
);
