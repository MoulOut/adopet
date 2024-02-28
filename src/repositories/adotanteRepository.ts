import { Repository } from 'typeorm';
import AdotanteEntity from '../entities/adotanteEntity.entity';
import InterfaceAdotanteRepository from './interfaces/interfaceAdotanteRepository';
import EnderecoEntity from '../entities/enderecoEntity.entity';

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;
  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    await this.repository.save(adotante);
  }

  async listaAdotantes(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }
  async atualizaAdotante(
    id: number,
    newData: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } });

      if (!adotanteToUpdate) {
        return { success: false, message: 'Adotante não encontrado' };
      }

      Object.assign(adotanteToUpdate, newData);

      await this.repository.save(adotanteToUpdate);

      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Ocorreu um erro ao tentar atualizar o adotante.',
      };
    }
  }

  async deletaAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToRemove = await this.repository.findOne({ where: { id } });

      if (!adotanteToRemove) {
        return { success: false, message: 'Adotante não encontrado' };
      }

      await this.repository.remove(adotanteToRemove);

      return { success: true };
    } catch (error) {
      // Se ocorrer um erro inesperado, você pode retornar uma mensagem genérica ou personalizada.
      return {
        success: false,
        message: 'Ocorreu um erro ao tentar excluir o adotante.',
      };
    }
  }

  async atualizaEndereçoAdotante(
    adotanteId: number,
    endereco: EnderecoEntity
  ): Promise<{
    success: boolean;
    message?: string;
  }> {
    const adotante = await this.repository.findOneBy({ id: adotanteId });

    if (!adotante) {
      return { success: false, message: 'Adotante não encontrado' };
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    adotante.endereco = novoEndereco;
    await this.repository.save(adotante);

    return { success: true, message: 'Endereço cadastrado com sucesso.' };
  }
}
