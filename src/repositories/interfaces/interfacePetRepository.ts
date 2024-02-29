import PetEntity from '../../entities/petEntity.entity';
import { EnumPorte } from '../../enum/porte';

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void;

  listaPet(): PetEntity[] | Promise<PetEntity[]>;

  atualizaPet(
    pet: PetEntity,
    id: number
  ): void | Promise<{ sucess: boolean; message?: string }>;

  deletaPet(id: number): void | Promise<{ sucess: boolean; message?: string }>;

  buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> | PetEntity[];
}
