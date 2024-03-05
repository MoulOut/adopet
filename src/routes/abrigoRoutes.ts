import express, { RequestHandler } from 'express';
import AbrigoController from '../controller/abrigoController';
import AbrigoRepository from '../repositories/abrigoRepository';
import { appDataSource } from '../config/dataSource';
import { middlewareValidaBodyEndereco } from '../middlewares/validators/enderecoRequestBody';
import { middlewareValidaBodyAbrigo } from '../middlewares/validators/abrigoRequestBody';
import { MiddlewareVerifyId } from '../middlewares/verificaId';

const router = express.Router();

const adotanteRepository = new AbrigoRepository(
  appDataSource.getRepository('AbrigoEntity')
);
const abrigoController = new AbrigoController(adotanteRepository);

const validateBodyAbrigo: RequestHandler = (req, res, next) =>
  middlewareValidaBodyAbrigo(req, res, next);

const validateBodyEndereo: RequestHandler = (req, res, next) =>
  middlewareValidaBodyEndereco(req, res, next);

router
  .post('/', validateBodyAbrigo, (req, res) =>
    abrigoController.criaAbrigo(req, res)
  )
  .get('/', (req, res) => abrigoController.pegaAbrigos(req, res))
  .put('/:id', MiddlewareVerifyId, (req, res) =>
    abrigoController.atualizaAbrigo(req, res)
  )
  .delete('/:id', MiddlewareVerifyId, (req, res) =>
    abrigoController.deletaAbrigo(req, res)
  )
  .patch('/:id', MiddlewareVerifyId, validateBodyEndereo, (req, res) =>
    abrigoController.atualizaEndereco(req, res)
  );

export default router;
