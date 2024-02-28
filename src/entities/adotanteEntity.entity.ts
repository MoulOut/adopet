import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import EnderecoEntity from './enderecoEntity.entity';

@Entity()
export default class AdotanteEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  senha: string;
  @Column()
  celular: string;
  @Column({ nullable: true })
  foto?: string;
  @OneToOne(() => EnderecoEntity, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  endereco?: EnderecoEntity;

  constructor(
    nome: string,
    senha: string,
    celular: string,
    foto?: string,
    endereco?: EnderecoEntity
  ) {
    this.nome = nome;
    this.senha = senha;
    this.foto = foto;
    this.celular = celular;
    this.endereco = endereco;
  }
}
