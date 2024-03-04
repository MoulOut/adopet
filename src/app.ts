import express from 'express';
import router from './routes';
import 'reflect-metadata';
import { appDataSource } from './config/dataSource';
import { MiddlewareErro } from './middlewares/erro';

const app = express();
app.use(express.json());

router(app);

app.use(MiddlewareErro);
appDataSource
  .initialize()
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.error(error));

export default app;
