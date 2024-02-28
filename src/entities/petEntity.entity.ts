import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { EnumEspecie } from '../enum/especies';
import AdotanteEntity from './adotanteEntity.entity';

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  nome: string;

  @Column()
  especie: EnumEspecie;

  @Column()
  dataDeNascimento: Date;

  @Column()
  adotado: boolean;

  @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
  adotante!: AdotanteEntity;

  constructor(
    nome: string,
    especie: EnumEspecie,
    dataDeNascimento: Date,
    adotado: boolean
  ) {
    this.adotado = adotado;
    this.especie = especie;
    this.nome = nome;
    this.dataDeNascimento = dataDeNascimento;
  }
}
