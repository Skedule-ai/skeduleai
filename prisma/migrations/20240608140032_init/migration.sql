-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("userId","organizationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_id_userId_organizationId_key" ON "service"("id", "userId", "organizationId");
