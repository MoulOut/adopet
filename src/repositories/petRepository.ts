import { Repository } from 'typeorm';
import PetEntity from '../entities/petEntity.entity';
import InterfacePetRepository from './interfaces/interfacePetRepository';

export default class PetRepository implements InterfacePetRepository {
  private repository: Repository<PetEntity>;

  constructor(repository: Repository<PetEntity>) {
    this.repository = repository;
  }

  criaPet(pet: PetEntity): void {
    this.repository.save(pet);
  }

  async listaPet(): Promise<PetEntity[]> {
    return await this.repository.find();
  }

  async atualizaPet(
    newData: PetEntity,
    id: number
  ): Promise<{ sucess: boolean; message?: string }> {
    const atualizaPet = await this.repository.findOneBy({ id });

    if (atualizaPet === null) {
      return { sucess: false, message: 'Pet não encontrado.' };
    }

    Object.assign(atualizaPet, newData);

    await this.repository.save(atualizaPet);
    return { sucess: true, message: 'Pet atualizado com sucesso' };
  }

  async deletaPet(id: number): Promise<{ sucess: boolean; message?: string }> {
    const deletaPet = await this.repository.delete({ id });

    if (deletaPet.affected === 0) {
      return { sucess: false, message: 'Pet não encontrado.' };
    }

    return { sucess: true, message: 'Pet deletado com sucesso.' };
  }
}
