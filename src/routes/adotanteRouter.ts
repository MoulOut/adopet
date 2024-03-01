import express, { RequestHandler } from 'express';
import AdotanteController from '../controller/adotanteController';
import AdotanteRepository from '../repositories/adotanteRepository';
import { appDataSource } from '../config/dataSource';
import { middlewareValidaBodyAdotante } from '../middlewares/validators/adotanteRequestBody';

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  appDataSource.getRepository('AdotanteEntity')
);
const adotanteController = new AdotanteController(adotanteRepository);

const validateBody: RequestHandler = (req, res, next) =>
  middlewareValidaBodyAdotante(req, res, next);

router
  .post('/', validateBody, (req, res) =>
    adotanteController.criaAdotante(req, res)
  )
  .get('/', (req, res) => adotanteController.listaAdotantes(req, res))
  .put('/:id', (req, res) => adotanteController.atualizaAdotante(req, res))
  .delete('/:id', (req, res) => adotanteController.deletaAdotante(req, res))
  .patch('/:id', (req, res) => adotanteController.atualizaEndereco(req, res));

export default router;
