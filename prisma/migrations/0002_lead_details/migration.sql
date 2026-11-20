-- AlterTable
ALTER TABLE "DemoRequest" ADD COLUMN     "bookingOffered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "configuration" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "estimate" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "language" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "page" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "referrer" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "timeZone" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN     "language" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "page" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "referrer" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "timeZone" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT NOT NULL DEFAULT '',
    "message" TEXT NOT NULL DEFAULT '',
    "configuration" TEXT NOT NULL,
    "estimate" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "timeZone" TEXT NOT NULL DEFAULT '',
    "language" TEXT NOT NULL DEFAULT '',
    "page" TEXT NOT NULL DEFAULT '',
    "referrer" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'new',

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

