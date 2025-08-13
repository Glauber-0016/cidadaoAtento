import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

import { Comentario } from '../comentarios/comentario.entity';
import { Like } from '../likes/like.entity';

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

  @OneToMany(() => Comentario, comentario => comentario.ocorrencia) 
  comentarios: Comentario[];

  @OneToMany(() => Like, like => like.ocorrencia) // <-- Adicione esta propriedade
  likes: Like[];

}


