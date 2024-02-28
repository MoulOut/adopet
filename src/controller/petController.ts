import { Request, Response } from 'express';
import type PetType from '../types/petTypes';
import { EnumEspecie } from '../enum/especies';
import PetRepository from '../repositories/petRepository';
import PetEntity from '../entities/petEntity.entity';

export default class PetController {
  constructor(private repository: PetRepository) {}
  async listaPets(req: Request, res: Response) {
    const petsList = await this.repository.listaPet();
    return res.status(200).json(petsList);
  }

  async criaPet(req: Request, res: Response) {
    const { dataDeNascimento, nome, adotado, especie } = req.body as PetEntity;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ Error: 'Especie invalida.' });
    }

    const newPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
    await this.repository.criaPet(newPet);

    return res.status(201).json(newPet);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { sucess, message } = await this.repository.atualizaPet(
      req.body as PetEntity,
      Number(id)
    );

    if (sucess) {
      return res.status(200).json(message);
    }

    return res.status(404).json({ message });
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { sucess, message } = await this.repository.deletaPet(Number(id));

    if (sucess) {
      return res.status(200).json({ message });
    }

    return res.status(404).json({ message });
  }
}
