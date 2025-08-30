-- CreateTable
CREATE TABLE "Opt" (
    "id" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "expirayTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Opt_pkey" PRIMARY KEY ("id")
);
