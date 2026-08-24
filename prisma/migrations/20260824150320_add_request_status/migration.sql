-- AlterTable
ALTER TABLE "TeeRequest" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'NEW';

-- CreateIndex
CREATE INDEX "TeeRequest_status_idx" ON "TeeRequest"("status");
