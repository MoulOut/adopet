import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EnumEspecie } from '../enum/especies';
import AdotanteEntity from './adotanteEntity.entity';
import { EnumPorte } from '../enum/porte';

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  nome: string;

  @Column()
  especie: EnumEspecie;

  @Column({ nullable: true })
  porte?: EnumPorte;

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
    adotado: boolean,
    porte?: EnumPorte
  ) {
    this.adotado = adotado;
    this.especie = especie;
    this.porte = porte;
    this.nome = nome;
    this.dataDeNascimento = dataDeNascimento;
  }
}
