import { RequestHandler } from 'express';
import * as yup from 'yup';
import EnderecoEntity from '../../entities/enderecoEntity.entity';
import { pt } from 'yup-locale-pt';

yup.setLocale(pt);

const enderecoBodySchema: yup.ObjectSchema<Omit<EnderecoEntity, 'id'>> =
  yup.object({
    cidade: yup.string().required().defined(),
    estado: yup.string().required().defined(),
  });

const middlewareValidaBodyEndereco: RequestHandler = async (req, res, next) => {
  try {
    await enderecoBodySchema.validate(req.body, {
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

export { middlewareValidaBodyEndereco };
