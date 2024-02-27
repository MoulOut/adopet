import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EnumEspecie } from '../enum/especies';

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  nome: string;
  @Column()
  especie: EnumEspecie;
  @Column()
  dataDeNascimento: Date;
  @Column()
  adotado: boolean;
}
