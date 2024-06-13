/*
  Warnings:

  - Added the required column `time` to the `bookingDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookingDetails" ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;
