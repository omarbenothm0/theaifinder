-- CreateEnum
CREATE TYPE "MonitoringCheckStatusEnum" AS ENUM ('success', 'failed', 'timeout', 'invalid_url');

-- CreateTable
CREATE TABLE "ToolMonitoringCheck" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "MonitoringCheckStatusEnum" NOT NULL,
    "httpStatus" INTEGER,
    "finalUrl" TEXT,
    "responseTimeMs" INTEGER,
    "isHttps" BOOLEAN,
    "redirectCount" INTEGER,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "requestedUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ToolMonitoringCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ToolMonitoringCheck_toolId_checkedAt_idx" ON "ToolMonitoringCheck"("toolId", "checkedAt" DESC);

-- CreateIndex
CREATE INDEX "ToolMonitoringCheck_checkedAt_idx" ON "ToolMonitoringCheck"("checkedAt");

-- AddForeignKey
ALTER TABLE "ToolMonitoringCheck" ADD CONSTRAINT "ToolMonitoringCheck_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
