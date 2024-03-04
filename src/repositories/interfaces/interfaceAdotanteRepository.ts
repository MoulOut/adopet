import AdotanteEntity from '../../entities/adotanteEntity.entity';
import EnderecoEntity from '../../entities/enderecoEntity.entity';

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): Promise<void> | void;

  listaAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;

  atualizaAdotante(id: number, adotante: AdotanteEntity): void;

  deletaAdotante(id: number): void;

  atualizaEndereçoAdotante(adotanteId: number, endereco: EnderecoEntity): void;
}
