import AdotanteEntity from '../../entities/adotanteEntity.entity';

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
}
