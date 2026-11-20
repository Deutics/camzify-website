-- CreateTable
CREATE TABLE "DemoBooking" (
    "id" TEXT NOT NULL,
    "demoRequestId" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT NOT NULL DEFAULT '',
    "meetUrl" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemoBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DemoBooking_demoRequestId_key" ON "DemoBooking"("demoRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "DemoBooking_start_key" ON "DemoBooking"("start");

-- AddForeignKey
ALTER TABLE "DemoBooking" ADD CONSTRAINT "DemoBooking_demoRequestId_fkey" FOREIGN KEY ("demoRequestId") REFERENCES "DemoRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

