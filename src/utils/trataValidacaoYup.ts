import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const trataValidacaoYup = (
  schema: yup.Schema<unknown>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.validate(req.body, {
      abortEarly: false,
    });

    return next();
  } catch (error) {
    const yupErrors = error as yup.ValidationError;

    const validationErrors: Record<string, string> = {};
    yupErrors.inner.forEach((error) => {
      if (error.path === undefined) return;
      validationErrors[error.path] = error.message;
    });

    return res.status(400).json({ error: validationErrors });
  }
};

export default trataValidacaoYup;
