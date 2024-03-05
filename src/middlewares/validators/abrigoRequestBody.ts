import { RequestHandler } from 'express';
import * as yup from 'yup';
import { pt } from 'yup-locale-pt';
import trataValidacaoYup from '../../utils/trataValidacaoYup';
import { TipoRequestBodyAbrigo } from '../../types/abrigoTypes';

yup.setLocale(pt);

const abrigoBodySchema: yup.ObjectSchema<
  Omit<TipoRequestBodyAbrigo, 'endereco'>
> = yup.object({
  nome: yup.string().defined().required(),
  senha: yup
    .string()
    .defined()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?/]).{8,}$/,
      'Senha não atende aos parametros'
    ),
  email: yup.string().email().required(),
  celular: yup
    .string()
    .defined()
    .required()
    .matches(
      /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
      'celular invalido'
    ),
});

const middlewareValidaBodyAbrigo: RequestHandler = async (req, res, next) => {
  trataValidacaoYup(abrigoBodySchema, req, res, next);
};

export { middlewareValidaBodyAbrigo };
