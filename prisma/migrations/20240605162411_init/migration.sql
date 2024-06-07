-- CreateTable
CREATE TABLE "userConfiguration" (
    "userId" TEXT NOT NULL,
    "onBoardingModal" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userConfiguration_pkey" PRIMARY KEY ("userId")
);
