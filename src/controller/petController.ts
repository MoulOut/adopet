import { Request, Response } from 'express';
import type PetType from '../types/petTypes';
let listaDePets: PetType[] = [];

export default class PetController {
  listaPets(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }

  criaPet(req: Request, res: Response) {
    const { id, idade, nome, adotado, especie } = req.body as PetType;
    const newPet: PetType = { id, idade, adotado, especie, nome };
    listaDePets.push(newPet);

    return res.status(201).json(newPet);
  }

  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { adotado, especie, idade, nome } = req.body as PetType;
    const pet = listaDePets.find((pet) => pet.id === Number(id));

    if (pet) {
      pet.adotado = adotado;
      pet.especie = especie;
      pet.idade = idade;
      pet.nome = nome;

      return res
        .status(200)
        .json({ message: 'Pet atualizado com sucesso', pet });
    }

    return res.status(404).json({ error: 'Pet não encontrado' });
  }

  deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));

    if (pet) {
      const index = listaDePets.indexOf(pet);
      listaDePets.splice(index, 1);
      return res
        .status(200)
        .json({ message: 'Pet deletado com sucesso.', petDeletado: pet });
    }

    return res.status(404).json({ error: 'Pet não encontrado.' });
  }
}
