/*
  Warnings:

  - You are about to drop the column `serviceName` on the `service` table. All the data in the column will be lost.
  - Added the required column `name` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "serviceName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
