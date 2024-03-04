import AbrigoEntity from '../../entities/abrigoEntity.entity';
import EnderecoEntity from '../../entities/enderecoEntity.entity';

export default interface InterfaceAbrigoRepository {
  criaAbrigo(abrigo: AbrigoEntity): Promise<void> | void;

  listaAbrigos(): AbrigoEntity[] | Promise<AbrigoEntity[]>;

  atualizaAbrigo(id: number, abrigo: AbrigoEntity): void;

  deletaAbrigo(id: number): void;

  atualizaEndereçoAbrigo(abrigoId: number, endereco: EnderecoEntity): void;
}
