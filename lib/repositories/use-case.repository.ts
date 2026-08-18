import {
  PersonaUseCaseLink,
  PersonaUseCasePage,
  PersonaHubSection,
  UseCaseFitTier,
  ToolUseCaseLink,
} from '../../types/tool';
import { prisma } from '../prisma';
import {
  mapUseCase,
  mapPersona,
  mapToolUseCaseFit,
  isStrongPlusFitTier,
  PUBLISHED_TOOL_WHERE,
  TOOL_INCLUDE,
} from '../repository-shared';

export class UseCaseRepository {
  public static async getPersonaUseCases(personaSlug: string): Promise<PersonaUseCaseLink[]> {
    const links = await prisma.personaUseCase.findMany({
      where: {
        persona: {
          slug: { equals: personaSlug, mode: 'insensitive' },
          publishStatus: 'published',
        },
      },
      include: { useCase: true },
      orderBy: { order: 'asc' },
    });

    return links.map((link) => ({
      order: link.order,
      isPrimary: link.isPrimary,
      pageEnabled: link.pageEnabled,
      hubNote: link.hubNote ?? undefined,
      useCase: mapUseCase(link.useCase),
    }));
  }

  public static async getPersonaHubSections(personaSlug: string): Promise<PersonaHubSection[]> {
    const links = await prisma.personaUseCase.findMany({
      where: {
        persona: {
          slug: { equals: personaSlug, mode: 'insensitive' },
          publishStatus: 'published',
        },
      },
      include: { useCase: true },
      orderBy: { order: 'asc' },
    });

    const sections: PersonaHubSection[] = [];

    for (const link of links) {
      const toolLinks = await prisma.toolUseCase.findMany({
        where: {
          useCaseId: link.useCaseId,
          fitTier: { not: 'exclude' },
          tool: PUBLISHED_TOOL_WHERE,
        },
        include: { tool: { include: TOOL_INCLUDE } },
        orderBy: { displayOrder: 'asc' },
      });

      sections.push({
        useCase: mapUseCase(link.useCase),
        link: {
          order: link.order,
          isPrimary: link.isPrimary,
          pageEnabled: link.pageEnabled,
          hubNote: link.hubNote ?? undefined,
        },
        tools: toolLinks.map(mapToolUseCaseFit),
      });
    }

    return sections;
  }

  public static async getPersonaUseCasePage(
    personaSlug: string,
    useCaseSlug: string
  ): Promise<PersonaUseCasePage | undefined> {
    const link = await prisma.personaUseCase.findFirst({
      where: {
        pageEnabled: true,
        persona: {
          slug: { equals: personaSlug, mode: 'insensitive' },
          publishStatus: 'published',
        },
        useCase: {
          slug: { equals: useCaseSlug, mode: 'insensitive' },
          publishStatus: 'published',
        },
      },
      include: {
        persona: { include: { faqs: true, topTools: { select: { tool: { select: { slug: true } }, order: true } } } },
        useCase: true,
      },
    });

    if (!link) return undefined;

    const toolLinks = await prisma.toolUseCase.findMany({
      where: {
        useCaseId: link.useCaseId,
        fitTier: { not: 'exclude' },
        tool: PUBLISHED_TOOL_WHERE,
      },
      include: { tool: { include: TOOL_INCLUDE } },
      orderBy: { displayOrder: 'asc' },
    });

    const tools = toolLinks.map(mapToolUseCaseFit);
    const strongPlusToolIds = new Set<string>();
    for (const tl of toolLinks) {
      if (isStrongPlusFitTier(tl.fitTier as UseCaseFitTier)) {
        strongPlusToolIds.add(tl.toolId);
      }
    }

    return {
      persona: mapPersona(link.persona),
      useCase: mapUseCase(link.useCase),
      link: {
        order: link.order,
        isPrimary: link.isPrimary,
        pageEnabled: link.pageEnabled,
        hubNote: link.hubNote ?? undefined,
      },
      tools,
      strongPlusCount: strongPlusToolIds.size,
    };
  }

  public static async getIndexablePersonaUseCasePages(): Promise<
    Array<{ personaSlug: string; useCaseSlug: string; strongPlusCount: number }>
  > {
    const links = await prisma.personaUseCase.findMany({
      where: {
        pageEnabled: true,
        persona: { publishStatus: 'published' },
        useCase: { publishStatus: 'published' },
      },
      include: {
        persona: { select: { slug: true } },
        useCase: { select: { slug: true, id: true } },
      },
    });

    const results: Array<{ personaSlug: string; useCaseSlug: string; strongPlusCount: number }> = [];

    for (const link of links) {
      const strongLinks = await prisma.toolUseCase.findMany({
        where: {
          useCaseId: link.useCaseId,
          fitTier: { in: ['primary', 'strong'] },
          tool: PUBLISHED_TOOL_WHERE,
        },
        select: { toolId: true },
      });
      const strongPlusCount = new Set(strongLinks.map((sl) => sl.toolId)).size;
      if (strongPlusCount >= 3) {
        results.push({
          personaSlug: link.persona.slug,
          useCaseSlug: link.useCase.slug,
          strongPlusCount,
        });
      }
    }

    return results;
  }

  public static async getToolUseCaseLinks(toolSlug: string): Promise<ToolUseCaseLink[]> {
    const tool = await prisma.tool.findFirst({
      where: {
        slug: { equals: toolSlug, mode: 'insensitive' },
        ...PUBLISHED_TOOL_WHERE,
      },
      select: { id: true },
    });
    if (!tool) return [];

    const mappings = await prisma.toolUseCase.findMany({
      where: {
        toolId: tool.id,
        fitTier: { not: 'exclude' },
      },
      include: {
        useCase: {
          include: {
            personaLinks: {
              where: {
                persona: { publishStatus: 'published' },
              },
              include: { persona: { select: { slug: true, title: true } } },
            },
          },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });

    const seen = new Set<string>();
    const links: ToolUseCaseLink[] = [];

    for (const mapping of mappings) {
      for (const personaLink of mapping.useCase.personaLinks) {
        const key = `${personaLink.persona.slug}:${mapping.useCase.slug}:${mapping.section}`;
        if (seen.has(key)) continue;
        seen.add(key);
        links.push({
          personaSlug: personaLink.persona.slug,
          personaTitle: personaLink.persona.title,
          useCaseSlug: mapping.useCase.slug,
          useCaseTitle: mapping.useCase.title,
          fitTier: mapping.fitTier as UseCaseFitTier,
          section: mapping.section,
          pageEnabled: personaLink.pageEnabled,
        });
      }
    }

    return links;
  }
}
