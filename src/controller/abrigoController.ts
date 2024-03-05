import AbrigoRepository from '../repositories/abrigoRepository';
import { Request, Response } from 'express';
import {
  TipoRequestBodyAbrigo,
  TipoRequestParamsAbrigo,
  TipoResponseBodyAbrigo,
} from '../types/abrigoTypes';
import AbrigoEntity from '../entities/abrigoEntity.entity';
import EnderecoEntity from '../entities/enderecoEntity.entity';

export default class AbrigoController {
  constructor(private repository: AbrigoRepository) {}

  async criaAbrigo(
    req: Request<{}, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { nome, celular, email, senha, endereco } = req.body as AbrigoEntity;

    const newAbrigo = new AbrigoEntity(nome, email, senha, celular, endereco);

    await this.repository.criaAbrigo(newAbrigo);
    return res
      .status(201)
      .json({ data: { id: newAbrigo.id, nome, celular, email, endereco } });
  }

  async pegaAbrigos(req: Request, res: Response<TipoResponseBodyAbrigo>) {
    const abrigos = await this.repository.listaAbrigos();
    const data = abrigos.map((abrigo) => {
      return {
        id: abrigo.id,
        nome: abrigo.nome,
        email: abrigo.email,
        celular: abrigo.celular,
        endereco: abrigo.endereco,
      };
    });

    return res.status(200).json({ data });
  }

  async atualizaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.atualizaAbrigo(Number(id), req.body as AbrigoEntity);

    return res.sendStatus(204);
  }

  async deletaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    await this.repository.deletaAbrigo(Number(id));

    return res.sendStatus(204);
  }

  async atualizaEndereco(
    req: Request<TipoRequestParamsAbrigo, {}, EnderecoEntity>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;

    await this.repository.atualizaEndereçoAbrigo(Number(id), req.body);

    return res.sendStatus(204);
  }
}
