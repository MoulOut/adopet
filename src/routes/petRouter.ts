import express, { RequestHandler } from 'express';
import PetController from '../controller/petController';
import PetRepository from '../repositories/petRepository';
import { appDataSource } from '../config/dataSource';
import { middlewareValidaBodyPet } from '../middlewares/validators/petRequestBody';

const router = express.Router();
const petRepository = new PetRepository(
  appDataSource.getRepository('PetEntity'),
  appDataSource.getRepository('AdotanteEntity')
);
const petController = new PetController(petRepository);

const validateBodyPet: RequestHandler = (req, res, next) =>
  middlewareValidaBodyPet(req, res, next);

router
  .post('/', validateBodyPet, (req, res) => petController.criaPet(req, res))
  .get('/', (req, res) => petController.listaPets(req, res))
  .get('/filtro', (req, res) =>
    petController.buscaPetPorCampoGenerico(req, res)
  )
  .put('/:id', (req, res) => petController.atualizaPet(req, res))
  .put('/:pet_id/:id_adotante', (req, res) => petController.adotaPet(req, res))
  .delete('/:id', (req, res) => petController.deletaPet(req, res));

export default router;
