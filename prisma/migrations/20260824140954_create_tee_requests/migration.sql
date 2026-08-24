-- CreateTable
CREATE TABLE "TeeRequest" (
    "id" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeeRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TeeRequest_createdAt_idx" ON "TeeRequest"("createdAt");
