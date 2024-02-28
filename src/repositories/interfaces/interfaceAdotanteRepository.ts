import AdotanteEntity from '../../entities/adotanteEntity.entity';
import EnderecoEntity from '../../entities/enderecoEntity.entity';

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): Promise<void> | void;

  listaAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;

  atualizaAdotante(
    id: number,
    adotante: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> | void;

  deletaAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> | void;

  atualizaEndereçoAdotante(
    adotanteId: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }> | void;
}
