import { dbRepository } from '../dbRepository';
import { Persona } from '../../types/tool';

export class PersonaRepository {
  static async getAll(): Promise<Persona[]> {
    return dbRepository.getPersonas();
  }

  static async getBySlug(slug: string): Promise<Persona | null> {
    const persona = dbRepository.getPersonaBySlug(slug);
    return persona || null;
  }
}
