/*
  Warnings:

  - You are about to drop the column `description` on the `bookingService` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `bookingService` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "bookingService_id_userId_organizationId_key";

-- AlterTable
ALTER TABLE "bookingService" DROP COLUMN "description",
DROP COLUMN "name";
