import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EnumEspecie } from '../enum/especies';

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
