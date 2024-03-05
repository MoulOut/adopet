import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import PetEntity from './petEntity.entity';
import EnderecoEntity from './enderecoEntity.entity';
import { geraSenhaCriptografada } from '../utils/geraSenhaCriptografada';

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
  endereco?: EnderecoEntity;

  @Column({ unique: true })
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
    email: string,
    senha: string,
    celular: string,
    endereco?: EnderecoEntity
  ) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.celular = celular;
    this.endereco = endereco;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async criptografarSenha() {
    if (this.senha) {
      this.senha = geraSenhaCriptografada(this.senha);
    }
  }
}
