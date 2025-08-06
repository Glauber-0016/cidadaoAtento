
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', name: 'data_ocorrencia' })
  data_ocorrencia: Date;
}


