import { RequestHandler } from 'express';
import * as yup from 'yup';
import EnderecoEntity from '../../entities/enderecoEntity.entity';
import { pt } from 'yup-locale-pt';
import trataValidacaoYup from '../../utils/trataValidacaoYup';

yup.setLocale(pt);

const enderecoBodySchema: yup.ObjectSchema<Omit<EnderecoEntity, 'id'>> =
  yup.object({
    cidade: yup.string().required().defined(),
    estado: yup.string().required().defined(),
  });

const middlewareValidaBodyEndereco: RequestHandler = async (req, res, next) => {
  trataValidacaoYup(enderecoBodySchema, req, res, next);
};

export { middlewareValidaBodyEndereco };
