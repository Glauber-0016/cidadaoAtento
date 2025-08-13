import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

import { Ocorrencias } from '../ocorrencias/ocorrencias.entity';


@Entity()
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string; 

  @Column('text')
  texto: string; 

  @CreateDateColumn({ name: 'data_criacao' })
  data_criacao: Date;

  @ManyToOne(() => Ocorrencias, ocorrencia => ocorrencia.comentarios)
  ocorrencia: Ocorrencias;

  @Column()
  ocorrenciaId: number;
}