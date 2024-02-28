import AdotanteEntity from '../../entities/adotanteEntity.entity';

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): Promise<void> | void;
}
