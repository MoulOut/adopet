import { Repository } from 'typeorm';
import AdotanteEntity from '../entities/adotanteEntity.entity';
import InterfaceAdotanteRepository from './interfaces/interfaceAdotanteRepository';

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;
  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    await this.repository.save(adotante);
  }
}
