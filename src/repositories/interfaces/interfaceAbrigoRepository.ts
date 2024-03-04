import AbrigoEntity from '../../entities/abrigoEntity.entity';
import EnderecoEntity from '../../entities/enderecoEntity.entity';

export default interface InterfaceAbrigoRepository {
  criaAbrigo(abrigo: AbrigoEntity): Promise<void> | void;

  listaAbrigos(): AbrigoEntity[] | Promise<AbrigoEntity[]>;

  atualizaAbrigo(
    id: number,
    abrigo: AbrigoEntity
  ): Promise<{ success: boolean; message?: string }> | void;

  deletaAbrigo(
    id: number
  ): Promise<{ success: boolean; message?: string }> | void;

  atualizaEndereçoAbrigo(
    abrigoId: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }> | void;
}
