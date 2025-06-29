
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ocorrencias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column('decimal', {precision: 10, scale: 6})
  latitude: number;

  @Column('decimal', {precision: 10, scale: 6})
  longitude: number;

  @Column()
  imagens: string;

  @Column({ default: 'pendente' }) 
  status: string;
}


