import express from 'express';
import PetController from '../controller/petController';
import PetRepository from '../repositories/petRepository';
import { appDataSource } from '../config/dataSource';

const router = express.Router();
const petRepository = new PetRepository(
  appDataSource.getRepository('PetEntity')
);
const petController = new PetController(petRepository);

router
  .post('/', (req, res) => petController.criaPet(req, res))
  .get('/', (req, res) => petController.listaPets(req, res))
  .put('/:id', (req, res) => petController.atualizaPet(req, res))
  .delete('/:id', (req, res) => petController.deletaPet(req, res));

export default router;
