import { Request, Response } from 'express';

let listaDePets = [];

export default class PetController {
  criaPet(req: Request, res: Response) {
    const newPet = req.body;
    listaDePets.push(newPet);

    res.status(201).json(newPet);
  }
}
