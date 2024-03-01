import { RequestHandler } from 'express';
import * as yup from 'yup';
import { TipoRequestBodyPet } from '../../types/petTypes';
import { pt } from 'yup-locale-pt';
import { EnumEspecie } from '../../enum/especies';
import { EnumPorte } from '../../enum/porte';

yup.setLocale(pt);

const petBodySchema: yup.ObjectSchema<Omit<TipoRequestBodyPet, 'adotante'>> =
  yup.object({
    nome: yup.string().defined().required(),
    especie: yup
      .string()
      .oneOf(Object.values(EnumEspecie))
      .defined()
      .required(),
    porte: yup.string().oneOf(Object.values(EnumPorte)).defined().required(),
    dataDeNascimento: yup.date().defined().required(),
    adotado: yup.boolean().defined().required(),
  });

const middlewareValidaBodyPet: RequestHandler = async (req, res, next) => {
  try {
    await petBodySchema.validate(req.body, {
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

export { middlewareValidaBodyPet };
