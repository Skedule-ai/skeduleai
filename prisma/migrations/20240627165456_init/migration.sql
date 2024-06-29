/*
  Warnings:

  - You are about to drop the column `organizationName` on the `availabilityConfiguration` table. All the data in the column will be lost.
  - The primary key for the `organizationDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `organizationDetails` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `organizationDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "availabilityConfiguration" DROP COLUMN "organizationName";

-- AlterTable
ALTER TABLE "organizationDetails" DROP CONSTRAINT "organizationDetails_pkey",
DROP COLUMN "id",
ADD COLUMN     "organizationId" TEXT NOT NULL,
ADD CONSTRAINT "organizationDetails_pkey" PRIMARY KEY ("organizationId");
