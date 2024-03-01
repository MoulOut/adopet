import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import PetEntity from './petEntity.entity';
import EnderecoEntity from './enderecoEntity.entity';

@Entity()
export default class AbrigoEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  nome: string;

  @OneToOne(() => EnderecoEntity, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  endereco: EnderecoEntity;

  @Column({ nullable: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  celular: string;

  @OneToMany(() => PetEntity, (pet) => pet.abrigo, {
    nullable: true,
  })
  pets!: PetEntity[];

  constructor(
    nome: string,
    endereco: EnderecoEntity,
    email: string,
    senha: string,
    celular: string
  ) {
    this.nome = nome;
    this.endereco = endereco;
    this.email = email;
    this.senha = senha;
    this.celular = celular;
  }
}
