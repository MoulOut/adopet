// adotanteRouter.ts
import express from "express";
import AdotanteController from "../controller/adotanteController";
import AdotanteRepository from "../repositories/adotanteRepository";
import { appDataSource } from "../config/dataSource";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  appDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", (req, res) => adotanteController.criaAdotante(req, res));

export default router;
