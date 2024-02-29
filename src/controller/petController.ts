import { Request, Response } from 'express';
import { EnumEspecie } from '../enum/especies';
import PetRepository from '../repositories/petRepository';
import PetEntity from '../entities/petEntity.entity';
import { EnumPorte } from '../enum/porte';

export default class PetController {
  constructor(private repository: PetRepository) {}
  async listaPets(req: Request, res: Response) {
    const petsList = await this.repository.listaPet();
    return res.status(200).json(petsList);
  }

  async criaPet(req: Request, res: Response) {
    const { dataDeNascimento, nome, adotado, especie, porte } =
      req.body as PetEntity;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ Error: 'Especie invalida.' });
    }

    if (porte && !Object.values(EnumPorte).includes(porte)) {
      return res.status(400).json({ Error: 'Porte invalido.' });
    }

    const newPet = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      adotado,
      porte
    );
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

  async adotaPet(req: Request, res: Response) {
    const { pet_id, id_adotante } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(id_adotante)
    );
    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async buscaPetPeloPorte(req: Request, res: Response) {
    const { porte } = req.query;
    const listaDePets = await this.repository.buscaPetPeloPorte(
      porte as EnumPorte
    );

    return res.status(200).json(listaDePets);
  }
}
