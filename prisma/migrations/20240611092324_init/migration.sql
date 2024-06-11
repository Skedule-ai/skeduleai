-- AlterTable
ALTER TABLE "bookingDetails" ADD COLUMN     "guestUserId" INTEGER;

-- CreateTable
CREATE TABLE "guestUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneNumberVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "guestUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookingDetails" ADD CONSTRAINT "bookingDetails_guestUserId_fkey" FOREIGN KEY ("guestUserId") REFERENCES "guestUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
