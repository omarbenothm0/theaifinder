-- CreateEnum
CREATE TYPE "PublishStatusEnum" AS ENUM ('draft', 'published', 'archived');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN "publishStatus" "PublishStatusEnum" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "Tool" ADD COLUMN "publishStatus" "PublishStatusEnum" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "Persona" ADD COLUMN "publishStatus" "PublishStatusEnum" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "Comparison" ADD COLUMN "publishStatus" "PublishStatusEnum" NOT NULL DEFAULT 'published';

-- AlterTable
ALTER TABLE "Article" ADD COLUMN "publishStatus" "PublishStatusEnum" NOT NULL DEFAULT 'published';

-- CreateIndex
CREATE INDEX "Category_publishStatus_idx" ON "Category"("publishStatus");

-- CreateIndex
CREATE INDEX "Tool_featured_idx" ON "Tool"("featured");

-- CreateIndex
CREATE INDEX "Tool_trending_idx" ON "Tool"("trending");

-- CreateIndex
CREATE INDEX "Tool_publishStatus_idx" ON "Tool"("publishStatus");

-- CreateIndex
CREATE INDEX "Persona_publishStatus_idx" ON "Persona"("publishStatus");

-- CreateIndex
CREATE INDEX "Comparison_publishStatus_idx" ON "Comparison"("publishStatus");

-- CreateIndex
CREATE INDEX "Article_publishStatus_idx" ON "Article"("publishStatus");
