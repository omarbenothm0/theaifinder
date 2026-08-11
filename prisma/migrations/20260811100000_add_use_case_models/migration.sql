-- CreateEnum
CREATE TYPE "UseCaseFitTierEnum" AS ENUM ('primary', 'strong', 'partial', 'listed', 'exclude');

-- CreateTable
CREATE TABLE "UseCase" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "primaryKeyword" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "publishStatus" "PublishStatusEnum" NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UseCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonaUseCase" (
    "id" TEXT NOT NULL,
    "personaId" TEXT NOT NULL,
    "useCaseId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "pageEnabled" BOOLEAN NOT NULL DEFAULT true,
    "hubNote" TEXT,

    CONSTRAINT "PersonaUseCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToolUseCase" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "useCaseId" TEXT NOT NULL,
    "fitTier" "UseCaseFitTierEnum" NOT NULL,
    "capabilities" TEXT NOT NULL,
    "limitation" TEXT,
    "evidenceUrl" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "section" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ToolUseCase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UseCase_slug_key" ON "UseCase"("slug");

-- CreateIndex
CREATE INDEX "UseCase_slug_idx" ON "UseCase"("slug");

-- CreateIndex
CREATE INDEX "UseCase_publishStatus_idx" ON "UseCase"("publishStatus");

-- CreateIndex
CREATE UNIQUE INDEX "PersonaUseCase_personaId_useCaseId_key" ON "PersonaUseCase"("personaId", "useCaseId");

-- CreateIndex
CREATE INDEX "PersonaUseCase_personaId_idx" ON "PersonaUseCase"("personaId");

-- CreateIndex
CREATE INDEX "PersonaUseCase_useCaseId_idx" ON "PersonaUseCase"("useCaseId");

-- CreateIndex
CREATE UNIQUE INDEX "ToolUseCase_toolId_useCaseId_section_key" ON "ToolUseCase"("toolId", "useCaseId", "section");

-- CreateIndex
CREATE INDEX "ToolUseCase_useCaseId_idx" ON "ToolUseCase"("useCaseId");

-- CreateIndex
CREATE INDEX "ToolUseCase_toolId_idx" ON "ToolUseCase"("toolId");

-- AddForeignKey
ALTER TABLE "PersonaUseCase" ADD CONSTRAINT "PersonaUseCase_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonaUseCase" ADD CONSTRAINT "PersonaUseCase_useCaseId_fkey" FOREIGN KEY ("useCaseId") REFERENCES "UseCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolUseCase" ADD CONSTRAINT "ToolUseCase_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolUseCase" ADD CONSTRAINT "ToolUseCase_useCaseId_fkey" FOREIGN KEY ("useCaseId") REFERENCES "UseCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
