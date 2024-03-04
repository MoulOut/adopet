import { NextFunction, Request, Response } from 'express';
import { ManipulaErros } from '../utils/manipulaErros';
import { EnumStatusCodes } from '../enum/statusCodes';

export const MiddlewareErro = (
  erro: ManipulaErros,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = erro.statusCode ?? EnumStatusCodes.INTERNAL_SERVER_ERROR;

  const mensagem = erro.statusCode ? erro.message : 'Erro interno do servidor';

  res.status(statusCode).json({ mensagem });
  return next();
};
