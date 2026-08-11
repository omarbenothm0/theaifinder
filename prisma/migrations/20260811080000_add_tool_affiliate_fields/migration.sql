-- AlterTable
ALTER TABLE "Tool" ADD COLUMN "affiliateUrl" TEXT;
ALTER TABLE "Tool" ADD COLUMN "affiliateEnabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Tool" ADD COLUMN "affiliateProgram" TEXT;
