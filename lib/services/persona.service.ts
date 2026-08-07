import { PersonaRepository } from '../repositories/persona.repository';
import { Persona } from '../../types/tool';

export class PersonaService {
  static async getPersonas(): Promise<Persona[]> {
    return PersonaRepository.getAll();
  }

  static async getPersonaBySlug(slug: string): Promise<Persona | null> {
    return PersonaRepository.getBySlug(slug);
  }
}
