import { Repository } from 'typeorm';
import AbrigoEntity from '../entities/abrigoEntity.entity';
import InterfaceAbrigoRepository from './interfaces/interfaceAbrigoRepository';
import EnderecoEntity from '../entities/enderecoEntity.entity';
import { BadRequest, NotFound } from '../utils/manipulaErros';

export default class AbrigoRepository implements InterfaceAbrigoRepository {
  private repository: Repository<AbrigoEntity>;
  constructor(repository: Repository<AbrigoEntity>) {
    this.repository = repository;
  }

  private async abrigoComEmail(email: string) {
    return !!(await this.repository.findOneBy({ email }));
  }

  async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
    if (await this.abrigoComEmail(abrigo.email)) {
      throw new BadRequest('Já existe um abrigo com este email.');
    }
    await this.repository.save(abrigo);
  }

  async listaAbrigos(): Promise<AbrigoEntity[]> {
    return await this.repository.find();
  }

  async atualizaAbrigo(id: number, newData: AbrigoEntity) {
    const abrigoToUpdate = await this.repository.findOne({ where: { id } });

    if (!abrigoToUpdate) {
      throw new NotFound('Abrigo não encontrado.');
    }

    Object.assign(abrigoToUpdate, newData);

    await this.repository.save(abrigoToUpdate);

    return { success: true };
  }

  async deletaAbrigo(id: number) {
    const abrigoToRemove = await this.repository.findOne({ where: { id } });

    if (!abrigoToRemove) {
      throw new NotFound('Abrigo não encontrado.');
    }

    await this.repository.remove(abrigoToRemove);

    return { success: true, message: 'Abrigo removido com sucesso.' };
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
      throw new NotFound('Abrigo não encontrado.');
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    abrigo.endereco = novoEndereco;
    await this.repository.save(abrigo);

    return { success: true, message: 'Endereço cadastrado com sucesso.' };
  }
}
