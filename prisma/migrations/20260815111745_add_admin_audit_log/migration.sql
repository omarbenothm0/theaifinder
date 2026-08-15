-- CreateEnum
CREATE TYPE "AdminAuditActionEnum" AS ENUM ('tool_create', 'tool_update', 'tool_delete', 'review_moderate', 'review_delete', 'admin_login', 'admin_login_failed', 'admin_logout', 'monitoring_check');

-- CreateEnum
CREATE TYPE "AdminAuditEntityTypeEnum" AS ENUM ('tool', 'review', 'none');

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "status" SET DEFAULT 'pending',
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "AdminAuditLog" (
    "id" TEXT NOT NULL,
    "action" "AdminAuditActionEnum" NOT NULL,
    "entityType" "AdminAuditEntityTypeEnum" NOT NULL DEFAULT 'none',
    "entityId" TEXT,
    "actor" TEXT NOT NULL,
    "ipAddress" TEXT,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT,

    CONSTRAINT "AdminAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdminAuditLog_actor_idx" ON "AdminAuditLog"("actor");

-- CreateIndex
CREATE INDEX "AdminAuditLog_entityType_entityId_idx" ON "AdminAuditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "AdminAuditLog_action_idx" ON "AdminAuditLog"("action");

-- CreateIndex
CREATE INDEX "AdminAuditLog_createdAt_idx" ON "AdminAuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "AdminAuditLog_success_idx" ON "AdminAuditLog"("success");
