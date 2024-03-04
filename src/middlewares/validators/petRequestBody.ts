import { RequestHandler } from 'express';
import * as yup from 'yup';
import { TipoRequestBodyPet } from '../../types/petTypes';
import { pt } from 'yup-locale-pt';
import { EnumEspecie } from '../../enum/especies';
import { EnumPorte } from '../../enum/porte';
import trataValidacaoYup from '../../utils/trataValidacaoYup';

yup.setLocale(pt);

const petBodySchema: yup.ObjectSchema<
  Omit<TipoRequestBodyPet, 'adotante' | 'abrigo'>
> = yup.object({
  nome: yup.string().defined().required(),
  especie: yup.string().oneOf(Object.values(EnumEspecie)).defined().required(),
  porte: yup.string().oneOf(Object.values(EnumPorte)).defined().required(),
  dataDeNascimento: yup.date().defined().required(),
  adotado: yup.boolean().defined().required(),
});

const middlewareValidaBodyPet: RequestHandler = async (req, res, next) => {
  trataValidacaoYup(petBodySchema, req, res, next);
};

export { middlewareValidaBodyPet };
