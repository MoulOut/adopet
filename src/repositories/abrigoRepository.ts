import { Repository } from 'typeorm';
import AbrigoEntity from '../entities/abrigoEntity.entity';
import InterfaceAbrigoRepository from './interfaces/interfaceAbrigoRepository';
import EnderecoEntity from '../entities/enderecoEntity.entity';

export default class AbrigoRepository implements InterfaceAbrigoRepository {
  private repository: Repository<AbrigoEntity>;
  constructor(repository: Repository<AbrigoEntity>) {
    this.repository = repository;
  }

  async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
    await this.repository.save(abrigo);
  }

  async listaAbrigos(): Promise<AbrigoEntity[]> {
    return await this.repository.find();
  }

  async atualizaAbrigo(
    id: number,
    newData: AbrigoEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const abrigoToUpdate = await this.repository.findOne({ where: { id } });

      if (!abrigoToUpdate) {
        return { success: false, message: 'Abrigo não encontrado' };
      }

      Object.assign(abrigoToUpdate, newData);

      await this.repository.save(abrigoToUpdate);

      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Ocorreu um erro ao tentar atualizar o abrigo.',
      };
    }
  }

  async deletaAbrigo(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const abrigoToRemove = await this.repository.findOne({ where: { id } });

      if (!abrigoToRemove) {
        return { success: false, message: 'Abrigo não encontrado' };
      }

      await this.repository.remove(abrigoToRemove);

      return { success: true, message: 'Abrigo removido com sucesso.' };
    } catch (error) {
      // Se ocorrer um erro inesperado, você pode retornar uma mensagem genérica ou personalizada.
      return {
        success: false,
        message: 'Ocorreu um erro ao tentar excluir o abrigo.',
      };
    }
  }

  async atualizaEndereçoAbrigo(
    abrigoId: number,
    endereco: EnderecoEntity
  ): Promise<{
    success: boolean;
    message?: string;
  }> {
    const abrigo = await this.repository.findOneBy({ id: abrigoId });

    if (!abrigo) {
      return { success: false, message: 'Abrigo não encontrado' };
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    abrigo.endereco = novoEndereco;
    await this.repository.save(abrigo);

    return { success: true, message: 'Endereço cadastrado com sucesso.' };
  }
}
