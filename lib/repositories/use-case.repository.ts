import { dbRepository } from '../dbRepository';
import { PersonaUseCaseLink, PersonaUseCasePage } from '../../types/tool';

export class UseCaseRepository {
  static async getPersonaUseCases(personaSlug: string): Promise<PersonaUseCaseLink[]> {
    return dbRepository.getPersonaUseCases(personaSlug);
  }

  static async getPersonaUseCasePage(
    personaSlug: string,
    useCaseSlug: string
  ): Promise<PersonaUseCasePage | null> {
    const page = await dbRepository.getPersonaUseCasePage(personaSlug, useCaseSlug);
    return page ?? null;
  }

  static async getIndexablePages(): Promise<
    Array<{ personaSlug: string; useCaseSlug: string; strongPlusCount: number }>
  > {
    return dbRepository.getIndexablePersonaUseCasePages();
  }

  static async getToolUseCaseLinks(toolSlug: string) {
    return dbRepository.getToolUseCaseLinks(toolSlug);
  }
}
