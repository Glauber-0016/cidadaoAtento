
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ocorrencias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;
}


