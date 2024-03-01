import AdotanteEntity from '../entities/adotanteEntity.entity';

type TipoRequestBodyAdotante = Omit<AdotanteEntity, 'id' | 'pets'>;

type TipoRequestParamsAdotante = { id?: string };

type TipoResponseBodyAdotante = {
  data?:
    | Pick<AdotanteEntity, 'id' | 'nome' | 'celular' | 'pets' | 'endereco'>
    | Pick<AdotanteEntity, 'id' | 'nome' | 'celular' | 'pets' | 'endereco'>[];
  error?: unknown;
  message?: unknown;
};

export {
  TipoRequestBodyAdotante,
  TipoResponseBodyAdotante,
  TipoRequestParamsAdotante,
};
