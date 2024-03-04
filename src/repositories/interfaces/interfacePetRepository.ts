import PetEntity from '../../entities/petEntity.entity';
import { EnumPorte } from '../../enum/porte';

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void;

  listaPet(): PetEntity[] | Promise<PetEntity[]>;

  atualizaPet(pet: PetEntity, id: number): void;

  deletaPet(id: number): void;

  buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> | PetEntity[];

  buscaPetPorCampoGenerico<T extends keyof PetEntity>(
    campo: T,
    valor: PetEntity[T]
  ): Promise<PetEntity[]> | PetEntity[];
}
