/*
  Warnings:

  - You are about to drop the `workspace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "workspace";

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);
