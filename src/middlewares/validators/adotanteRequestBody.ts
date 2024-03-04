import { RequestHandler } from 'express';
import * as yup from 'yup';
import { TipoRequestBodyAdotante } from '../../types/adotanteTypes';
import { pt } from 'yup-locale-pt';
import trataValidacaoYup from '../../utils/trataValidacaoYup';

yup.setLocale(pt);

const adotanteBodySchema: yup.ObjectSchema<
  Omit<TipoRequestBodyAdotante, 'endereco'>
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
  celular: yup
    .string()
    .defined()
    .required()
    .matches(
      /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
      'celular invalido'
    ),
  foto: yup.string().optional(),
});

const middlewareValidaBodyAdotante: RequestHandler = async (req, res, next) => {
  trataValidacaoYup(adotanteBodySchema, req, res, next);
};

export { middlewareValidaBodyAdotante };
