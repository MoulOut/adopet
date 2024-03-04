import { Request, Response } from 'express';
import { EnumEspecie } from '../enum/especies';
import PetRepository from '../repositories/petRepository';
import PetEntity from '../entities/petEntity.entity';
import { EnumPorte } from '../enum/porte';
import {
  TipoRequestBodyPet,
  TipoRequestParamsPet,
  TipoResponseBodyPet,
} from '../types/petTypes';

export default class PetController {
  constructor(private repository: PetRepository) {}
  
  async listaPets(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const petsList = await this.repository.listaPet();
    const data = petsList.map((pet) => {
      return {
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        porte: pet.porte === null ? undefined : pet.porte,
      };
    });
    return res.status(200).json({ data });
  }

  async criaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { dataDeNascimento, nome, adotado, especie, porte } =
      req.body as PetEntity;

    const newPet = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      adotado,
      porte
    );
    await this.repository.criaPet(newPet);

    return res
      .status(201)
      .json({ data: { id: newPet.id, especie, nome, porte } });
  }

  async atualizaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { id } = req.params;
    await this.repository.atualizaPet(req.body as PetEntity, Number(id));

    return res.sendStatus(204);
  }

  async deletaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { id } = req.params;
    await this.repository.deletaPet(Number(id));

    return res.status(204);
  }

  async adotaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { pet_id, id_adotante } = req.params;
    await this.repository.adotaPet(Number(pet_id), Number(id_adotante));

    return res.sendStatus(204);
  }

  async buscaPetPeloPorte(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { porte } = req.query;
    const listaDePets = await this.repository.buscaPetPeloPorte(
      porte as EnumPorte
    );
    const data = listaDePets.map((pet) => {
      return {
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        porte: pet.porte,
      };
    });

    return res.status(200).json({ data });
  }

  async buscaPetPorCampoGenerico(req: Request, res: Response) {
    const { campo, valor } = req.query;

    const listaDePets = await this.repository.buscaPetPorCampoGenerico(
      campo as keyof PetEntity,
      valor as string
    );

    return res.status(200).json(listaDePets);
  }
}
