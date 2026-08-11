-- CreateEnum
CREATE TYPE "ReviewStatusEnum" AS ENUM ('pending', 'approved', 'rejected', 'flagged');

-- AlterTable
ALTER TABLE "Review" ADD COLUMN "email" TEXT;
ALTER TABLE "Review" ADD COLUMN "status" "ReviewStatusEnum" NOT NULL DEFAULT 'approved';
ALTER TABLE "Review" ADD COLUMN "moderatedAt" TIMESTAMP(3);
ALTER TABLE "Review" ADD COLUMN "moderatedBy" TEXT;
ALTER TABLE "Review" ADD COLUMN "moderationNotes" TEXT;
ALTER TABLE "Review" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Existing rows were editorial/seed content — treat as approved.
ALTER TABLE "Review" ALTER COLUMN "authorRole" SET DEFAULT '';

-- CreateIndex
CREATE INDEX "Review_status_idx" ON "Review"("status");
CREATE INDEX "Review_toolId_status_idx" ON "Review"("toolId", "status");
