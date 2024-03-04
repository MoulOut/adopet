import { Repository } from 'typeorm';
import AdotanteEntity from '../entities/adotanteEntity.entity';
import InterfaceAdotanteRepository from './interfaces/interfaceAdotanteRepository';
import EnderecoEntity from '../entities/enderecoEntity.entity';
import { BadRequest, NotFound } from '../utils/manipulaErros';

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;
  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  private async verificaCelular(celular: string) {
    return await this.repository.findOneBy({ celular });
  }
  
  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    if (await this.verificaCelular(adotante.celular)) {
      throw new BadRequest('Celular já cadastrado');
    }
    await this.repository.save(adotante);
  }

  async listaAdotantes(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }

  async atualizaAdotante(
    id: number,
    newData: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> {
    const adotanteToUpdate = await this.repository.findOne({ where: { id } });

    if (!adotanteToUpdate) {
      throw new NotFound('Adotante não encontrado');
    }

    Object.assign(adotanteToUpdate, newData);

    await this.repository.save(adotanteToUpdate);

    return { success: true };
  }

  async deletaAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    const adotanteToRemove = await this.repository.findOne({ where: { id } });

    if (!adotanteToRemove) {
      throw new NotFound('Adotante não encontrado');
    }

    await this.repository.remove(adotanteToRemove);

    return { success: true, message: 'Adotante removido com sucesso.' };
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
      throw new NotFound('Adotante não encontrado');
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    adotante.endereco = novoEndereco;
    await this.repository.save(adotante);

    return { success: true, message: 'Endereço cadastrado com sucesso.' };
  }
}
