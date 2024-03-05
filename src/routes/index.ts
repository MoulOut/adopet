import express from 'express';
import petRouter from './petRouter';
import adotanteRouter from './adotanteRouter';
import abrigoRouter from './abrigoRoutes';

const router = (app: express.Router) => {
  app.use('/pets', petRouter);
  app.use('/adotantes', adotanteRouter);
  app.use('/abrigos', abrigoRouter);
};

export default router;
