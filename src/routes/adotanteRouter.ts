import express from 'express';
import AdotanteController from '../controller/adotanteController';
import AdotanteRepository from '../repositories/adotanteRepository';
import { appDataSource } from '../config/dataSource';

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  appDataSource.getRepository('AdotanteEntity')
);
const adotanteController = new AdotanteController(adotanteRepository);

router
  .post('/', (req, res) => adotanteController.criaAdotante(req, res))
  .get('/', (req, res) => adotanteController.listaAdotantes(req, res))
  .put('/:id', (req, res) => adotanteController.atualizaAdotante(req, res))
  .delete('/:id', (req, res) => adotanteController.deletaAdotante(req, res));

export default router;
