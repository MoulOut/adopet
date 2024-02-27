import PetEntity from '../../entities/petEntity.entity';

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void;
  listaPet(): PetEntity[] | Promise<PetEntity[]>;
  atualizaPet(
    pet: PetEntity,
    id: number
  ): void | Promise<{ sucess: boolean; message?: string }>;
  deletaPet(id: number): void | Promise<{ sucess: boolean; message?: string }>;
}
