import { Repository } from 'typeorm';
import AbrigoRepository from '../repositories/abrigoRepository';
import { Request, Response } from 'express';

export default class AbrigoController {
  constructor(repository: AbrigoRepository) {}

  async criaAbrigo(req: Request, res: Response) {}

  async pegaAbrigos(req: Request, res: Response) {}

  async atualizaAbrigo(req: Request, res: Response) {}

  async deletaAbrigo(req: Request, res: Response) {}
}
