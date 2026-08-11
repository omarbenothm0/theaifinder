import { UseCaseRepository } from '../repositories/use-case.repository';
import { PersonaUseCaseLink, PersonaUseCasePage, PersonaHubSection } from '../../types/tool';

export class UseCaseService {
  static async getPersonaUseCases(personaSlug: string): Promise<PersonaUseCaseLink[]> {
    return UseCaseRepository.getPersonaUseCases(personaSlug);
  }

  static async getPersonaHubSections(personaSlug: string): Promise<PersonaHubSection[]> {
    return UseCaseRepository.getPersonaHubSections(personaSlug);
  }

  static async getPersonaUseCasePage(
    personaSlug: string,
    useCaseSlug: string
  ): Promise<PersonaUseCasePage | null> {
    return UseCaseRepository.getPersonaUseCasePage(personaSlug, useCaseSlug);
  }

  static async getIndexablePages(): Promise<
    Array<{ personaSlug: string; useCaseSlug: string; strongPlusCount: number }>
  > {
    return UseCaseRepository.getIndexablePages();
  }

  static async getToolUseCaseLinks(toolSlug: string) {
    return UseCaseRepository.getToolUseCaseLinks(toolSlug);
  }
}
