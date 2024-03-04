import { RequestHandler } from 'express';
import { BadRequest } from '../utils/manipulaErros';

export const MiddlewareVerifyId: RequestHandler = (req, res, next) => {
  const params = { ...req.params };

  for (const param in params) {
    if (!Number.isInteger(Number(params[param]))) {
      throw new BadRequest(`O paramatro ${param} deve ser um numero inteiro.`);
    }
  }

  return next()
};
