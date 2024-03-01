import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EnumEspecie } from '../enum/especies';
import AdotanteEntity from './adotanteEntity.entity';
import { EnumPorte } from '../enum/porte';
import AbrigoEntity from './abrigoEntity.entity';

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

  @ManyToOne(() => AbrigoEntity, (abrigo) => abrigo.pets, {
    eager: true,
  })
  abrigo!: AbrigoEntity;

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
