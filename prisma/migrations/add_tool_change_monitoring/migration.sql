-- Add hasFreeTier to Tool model
ALTER TABLE "Tool" ADD COLUMN "hasFreeTier" BOOLEAN NOT NULL DEFAULT false;

-- Add monitoring configuration fields to Tool model
ALTER TABLE "Tool" ADD COLUMN "monitoringEnabled" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Tool" ADD COLUMN "pricingSourceUrl" TEXT;
ALTER TABLE "Tool" ADD COLUMN "featuresSourceUrl" TEXT;

-- Create ToolSnapshot table
CREATE TABLE "ToolSnapshot" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "snapshotAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pricingModel" TEXT NOT NULL,
    "monthlyPrice" DOUBLE PRECISION,
    "hasFreeTrial" BOOLEAN NOT NULL,
    "hasFreeTier" BOOLEAN NOT NULL,
    "pricingTiers" JSONB NOT NULL,
    "features" TEXT[] NOT NULL,
    "platforms" TEXT[] NOT NULL,
    "integrations" TEXT[] NOT NULL,
    "usageLimits" JSONB,
    "languages" TEXT[] NOT NULL,
    "exportFormats" TEXT[] NOT NULL,
    "limitations" TEXT[] NOT NULL,
    "productName" TEXT,
    "targetAudience" TEXT[],
    "discontinuedFeatures" TEXT[],
    "policyChanges" TEXT[],
    "sourceUrls" JSONB NOT NULL,

    CONSTRAINT "ToolSnapshot_pkey" PRIMARY KEY ("id")
);

-- Create indexes for ToolSnapshot
CREATE INDEX "ToolSnapshot_toolId_snapshotAt_idx" ON "ToolSnapshot"("toolId", "snapshotAt" DESC);
CREATE INDEX "ToolSnapshot_snapshotAt_idx" ON "ToolSnapshot"("snapshotAt");

-- Add foreign key for ToolSnapshot
ALTER TABLE "ToolSnapshot" ADD CONSTRAINT "ToolSnapshot_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create ToolChangeRecord table
CREATE TABLE "ToolChangeRecord" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "previousValue" TEXT,
    "currentValue" TEXT,
    "sourceUrl" TEXT,
    "severity" TEXT NOT NULL DEFAULT 'info',
    "status" TEXT NOT NULL DEFAULT 'needs_review',
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ToolChangeRecord_pkey" PRIMARY KEY ("id")
);

-- Create indexes for ToolChangeRecord
CREATE INDEX "ToolChangeRecord_toolId_detectedAt_idx" ON "ToolChangeRecord"("toolId", "detectedAt" DESC);
CREATE INDEX "ToolChangeRecord_status_idx" ON "ToolChangeRecord"("status");
CREATE INDEX "ToolChangeRecord_severity_idx" ON "ToolChangeRecord"("severity");
CREATE INDEX "ToolChangeRecord_category_idx" ON "ToolChangeRecord"("category");

-- Add foreign keys for ToolChangeRecord
ALTER TABLE "ToolChangeRecord" ADD CONSTRAINT "ToolChangeRecord_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ToolChangeRecord" ADD CONSTRAINT "ToolChangeRecord_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "ToolSnapshot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
