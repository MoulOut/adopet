import PetEntity from '../entities/petEntity.entity';

type TipoRequestBodyPet = Omit<PetEntity, 'id'>;

type TipoRequestParamsPet = {
  id?: string;
  pet_id?: string;
  id_adotante?: string;
};

type TipoResponseBodyPet = {
  data?:
    | Pick<PetEntity, 'id' | 'nome' | 'especie' | 'porte'>
    | Pick<PetEntity, 'id' | 'nome' | 'especie' | 'porte'>[];
};

export { TipoRequestBodyPet, TipoResponseBodyPet, TipoRequestParamsPet };
