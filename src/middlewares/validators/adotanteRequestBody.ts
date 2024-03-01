import { RequestHandler } from 'express';
import * as yup from 'yup';
import { TipoRequestBodyAdotante } from '../../types/adotanteTypes';

const adotanteBodySchema: yup.ObjectSchema<
  Omit<TipoRequestBodyAdotante, 'endereco'>
> = yup.object({
  nome: yup.string().defined().required(),
  senha: yup.string().defined().required().min(6),
  celular: yup.string().defined().required(),
  foto: yup.string().optional(),
});

const middlewareValidaBodyAdotante: RequestHandler = async (req, res, next) => {
  try {
    await adotanteBodySchema.validate(req.body, {
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

export { middlewareValidaBodyAdotante };
