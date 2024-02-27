import { EnumEspecie } from '../enum/especies';

type PetType = {
  id: number;
  nome: string;
  especie: EnumEspecie;
  adotado: boolean;
  dataDeNascimento: Date;
};

export default PetType;
