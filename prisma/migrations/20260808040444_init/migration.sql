-- CreateEnum
CREATE TYPE "PricingModelEnum" AS ENUM ('Free', 'Freemium', 'Paid');

-- CreateEnum
CREATE TYPE "ReviewStateEnum" AS ENUM ('unverified', 'verified', 'needsReview', 'inReview');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryFAQ" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "CategoryFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "pricingModel" "PricingModelEnum" NOT NULL DEFAULT 'Freemium',
    "monthlyPrice" DOUBLE PRECISION,
    "hasFreeTrial" BOOLEAN NOT NULL DEFAULT true,
    "companyName" TEXT,
    "lastVerifiedDate" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "pricingSource" TEXT,
    "featureSource" TEXT,
    "reviewState" "ReviewStateEnum",
    "reviewRequestedAt" TIMESTAMP(3),
    "reviewAssignedTo" TEXT,
    "reviewNotes" TEXT,
    "websiteUrl" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "trending" BOOLEAN NOT NULL DEFAULT false,
    "hasApi" BOOLEAN NOT NULL DEFAULT false,
    "hasMobileApp" BOOLEAN NOT NULL DEFAULT false,
    "hasExtension" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "features" TEXT[],
    "pros" TEXT[],
    "cons" TEXT[],
    "screenshots" TEXT[],
    "platforms" TEXT[],
    "targetUsers" TEXT[],

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolSource" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "ToolSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PricingTier" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "billingPeriod" TEXT NOT NULL,
    "features" TEXT[],

    CONSTRAINT "PricingTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolFAQ" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "ToolFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolAlternative" (
    "id" TEXT NOT NULL,
    "sourceToolId" TEXT NOT NULL,
    "targetToolId" TEXT NOT NULL,

    CONSTRAINT "ToolAlternative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Persona" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetRole" TEXT NOT NULL,
    "keyBenefits" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonaTopTool" (
    "id" TEXT NOT NULL,
    "personaId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PersonaTopTool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonaFAQ" (
    "id" TEXT NOT NULL,
    "personaId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "PersonaFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "verifiedUser" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comparison" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tool1Id" TEXT NOT NULL,
    "tool2Id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "bestFor1" TEXT NOT NULL,
    "bestFor2" TEXT NOT NULL,
    "verdict" TEXT NOT NULL,
    "winnerSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comparison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonFeature" (
    "id" TEXT NOT NULL,
    "comparisonId" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "tool1Value" TEXT NOT NULL,
    "tool2Value" TEXT NOT NULL,
    "winnerSlug" TEXT NOT NULL,

    CONSTRAINT "ComparisonFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "relatedCategorySlug" TEXT,
    "relatedToolSlugs" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "CategoryFAQ_categoryId_idx" ON "CategoryFAQ"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_slug_key" ON "Tool"("slug");

-- CreateIndex
CREATE INDEX "Tool_slug_idx" ON "Tool"("slug");

-- CreateIndex
CREATE INDEX "Tool_categoryId_idx" ON "Tool"("categoryId");

-- CreateIndex
CREATE INDEX "ToolSource_toolId_idx" ON "ToolSource"("toolId");

-- CreateIndex
CREATE INDEX "PricingTier_toolId_idx" ON "PricingTier"("toolId");

-- CreateIndex
CREATE INDEX "ToolFAQ_toolId_idx" ON "ToolFAQ"("toolId");

-- CreateIndex
CREATE INDEX "ToolAlternative_sourceToolId_idx" ON "ToolAlternative"("sourceToolId");

-- CreateIndex
CREATE UNIQUE INDEX "ToolAlternative_sourceToolId_targetToolId_key" ON "ToolAlternative"("sourceToolId", "targetToolId");

-- CreateIndex
CREATE UNIQUE INDEX "Persona_title_key" ON "Persona"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Persona_slug_key" ON "Persona"("slug");

-- CreateIndex
CREATE INDEX "Persona_slug_idx" ON "Persona"("slug");

-- CreateIndex
CREATE INDEX "PersonaTopTool_personaId_idx" ON "PersonaTopTool"("personaId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonaTopTool_personaId_toolId_key" ON "PersonaTopTool"("personaId", "toolId");

-- CreateIndex
CREATE INDEX "PersonaFAQ_personaId_idx" ON "PersonaFAQ"("personaId");

-- CreateIndex
CREATE INDEX "Review_toolId_idx" ON "Review"("toolId");

-- CreateIndex
CREATE UNIQUE INDEX "Comparison_slug_key" ON "Comparison"("slug");

-- CreateIndex
CREATE INDEX "Comparison_slug_idx" ON "Comparison"("slug");

-- CreateIndex
CREATE INDEX "ComparisonFeature_comparisonId_idx" ON "ComparisonFeature"("comparisonId");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_slug_idx" ON "Article"("slug");

-- AddForeignKey
ALTER TABLE "CategoryFAQ" ADD CONSTRAINT "CategoryFAQ_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolSource" ADD CONSTRAINT "ToolSource_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PricingTier" ADD CONSTRAINT "PricingTier_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolFAQ" ADD CONSTRAINT "ToolFAQ_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolAlternative" ADD CONSTRAINT "ToolAlternative_sourceToolId_fkey" FOREIGN KEY ("sourceToolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolAlternative" ADD CONSTRAINT "ToolAlternative_targetToolId_fkey" FOREIGN KEY ("targetToolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonaTopTool" ADD CONSTRAINT "PersonaTopTool_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonaTopTool" ADD CONSTRAINT "PersonaTopTool_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonaFAQ" ADD CONSTRAINT "PersonaFAQ_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_tool1Id_fkey" FOREIGN KEY ("tool1Id") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_tool2Id_fkey" FOREIGN KEY ("tool2Id") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonFeature" ADD CONSTRAINT "ComparisonFeature_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "Comparison"("id") ON DELETE CASCADE ON UPDATE CASCADE;
