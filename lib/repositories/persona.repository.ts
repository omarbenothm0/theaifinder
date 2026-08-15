import { Persona } from '../../types/tool';
import { prisma } from '../prisma';
import { mapPersona, PUBLISHED_TOOL_WHERE } from '../repository-shared';

export class PersonaRepository {
  public static async getPersonas(options: { includeUnpublished?: boolean } = {}): Promise<Persona[]> {
    const personas = await prisma.persona.findMany({
      where: options.includeUnpublished ? {} : { publishStatus: 'published' },
      include: { faqs: true, topTools: { include: { tool: true } } },
    });
    return personas.map(mapPersona);
  }

  public static async getPersonaBySlug(
    slug: string,
    options: { includeUnpublished?: boolean } = {}
  ): Promise<Persona | undefined> {
    const persona = await prisma.persona.findFirst({
      where: {
        slug: { equals: slug, mode: 'insensitive' },
        ...(options.includeUnpublished ? {} : { publishStatus: 'published' }),
      },
      include: { faqs: true, topTools: { include: { tool: true } } },
    });
    return persona ? mapPersona(persona) : undefined;
  }

  public static async getPersonaLinkedToolCounts(): Promise<Record<string, number>> {
    const tools = await prisma.tool.findMany({
      where: PUBLISHED_TOOL_WHERE,
      select: { targetUsers: true },
    });
    const counts: Record<string, number> = {};
    for (const tool of tools) {
      for (const slug of tool.targetUsers) {
        counts[slug] = (counts[slug] ?? 0) + 1;
      }
    }
    return counts;
  }

  public static async getPersonaLinkedToolCount(slug: string): Promise<number> {
    return prisma.tool.count({
      where: {
        ...PUBLISHED_TOOL_WHERE,
        targetUsers: { has: slug },
      },
    });
  }

  // --- Preserve existing wrapper API for backward compatibility ---

  static async getAll(): Promise<Persona[]> {
    return PersonaRepository.getPersonas();
  }

  static async getBySlug(slug: string): Promise<Persona | null> {
    const persona = await PersonaRepository.getPersonaBySlug(slug);
    return persona || null;
  }
}
