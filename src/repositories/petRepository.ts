import { Repository } from 'typeorm';
import PetEntity from '../entities/petEntity.entity';
import InterfacePetRepository from './interfaces/interfacePetRepository';
import AdotanteEntity from '../entities/adotanteEntity.entity';
import { EnumPorte } from '../enum/porte';

export default class PetRepository implements InterfacePetRepository {
  private petRepository: Repository<PetEntity>;
  private adotanteRepository: Repository<AdotanteEntity>;

  constructor(
    petRepository: Repository<PetEntity>,
    adotanteRepository: Repository<AdotanteEntity>
  ) {
    this.petRepository = petRepository;
    this.adotanteRepository = adotanteRepository;
  }

  criaPet(pet: PetEntity): void {
    this.petRepository.save(pet);
  }

  async listaPet(): Promise<PetEntity[]> {
    return await this.petRepository.find();
  }

  async atualizaPet(
    newData: PetEntity,
    id: number
  ): Promise<{ sucess: boolean; message?: string }> {
    const atualizaPet = await this.petRepository.findOneBy({ id });

    if (atualizaPet === null) {
      return { sucess: false, message: 'Pet não encontrado.' };
    }

    Object.assign(atualizaPet, newData);

    await this.petRepository.save(atualizaPet);
    return { sucess: true, message: 'Pet atualizado com sucesso' };
  }

  async deletaPet(id: number): Promise<{ sucess: boolean; message?: string }> {
    const deletaPet = await this.petRepository.delete({ id });

    if (deletaPet.affected === 0) {
      return { sucess: false, message: 'Pet não encontrado.' };
    }

    return { sucess: true, message: 'Pet deletado com sucesso.' };
  }

  async adotaPet(
    petId: number,
    adotanteId: number
  ): Promise<{ success: boolean; message?: string }> {
    const pet = await this.petRepository.findOneBy({ id: petId });
    const adotante = await this.adotanteRepository.findOneBy({
      id: adotanteId,
    });

    if (pet === null) {
      return { success: false, message: 'Pet não encontrado' };
    }

    if (adotante === null) {
      return { success: false, message: 'Adotante não encontrado' };
    }

    pet.adotante = adotante;
    pet.adotado = true;
    adotante.pets.push(pet);

    await this.adotanteRepository.save(adotante);
    await this.petRepository.save(pet);

    return { success: true, message: 'Pet adotado com sucesso.' };
  }

  async buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> {
    const petsList = await this.petRepository.findBy({ porte });

    return petsList;
  }

  async buscaPetPorCampoGenerico<T extends keyof PetEntity>(
    campo: T,
    valor: PetEntity[T]
  ): Promise<PetEntity[]> {
    const petsList = await this.petRepository.find({
      where: { [campo]: valor },
    });

    return petsList;
  }
}
