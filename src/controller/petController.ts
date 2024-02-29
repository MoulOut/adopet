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
        porte: pet.porte,
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

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ error: 'Especie invalida.' });
    }

    if (porte && !Object.values(EnumPorte).includes(porte)) {
      return res.status(400).json({ error: 'Porte invalido.' });
    }

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
    const { sucess, message } = await this.repository.atualizaPet(
      req.body as PetEntity,
      Number(id)
    );

    if (sucess) {
      return res.status(200).json({ message });
    }

    return res.status(404).json({ error: message });
  }

  async deletaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { id } = req.params;
    const { sucess, message } = await this.repository.deletaPet(Number(id));

    if (sucess) {
      return res.status(200).json({ message });
    }

    return res.status(404).json({ error: message });
  }

  async adotaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { pet_id, id_adotante } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(id_adotante)
    );
    if (!success) {
      return res.status(404).json({ error: message });
    }
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
