import { Request, Response } from 'express';
import AdotanteRepository from '../repositories/adotanteRepository';
import AdotanteEntity from '../entities/adotanteEntity.entity';
import EnderecoEntity from '../entities/enderecoEntity.entity';
import {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
} from '../types/adotanteTypes';

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(
    req: Request<{}, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;

    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco
    );

    await this.repository.criaAdotante(novoAdotante);
    return res.status(201).json({
      data: { id: novoAdotante.id, nome, celular, pets: [], endereco },
    });
  }

  async atualizaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;
    await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity
    );

    return res.sendStatus(204);
  }

  async listaAdotantes(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const listaDeAdotantes = await this.repository.listaAdotantes();
    const data = listaDeAdotantes.map((adotante) => {
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular,
        endereco: adotante.endereco === null ? undefined : adotante.endereco,
        pets: adotante.pets,
      };
    });
    return res.status(200).json({ data });
  }

  async deletaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;

    await this.repository.deletaAdotante(Number(id));

    return res.sendStatus(204);
  }

  async atualizaEndereco(
    req: Request<TipoRequestParamsAdotante, {}, EnderecoEntity>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;

    await this.repository.atualizaEndereçoAdotante(Number(id), req.body);

    return res.status(204);
  }
}
