import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';

import { Ocorrencias } from '../ocorrencias/ocorrencias.entity';

@Entity()
@Unique(["userId", "ocorrenciaId"]) 
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; 

  @ManyToOne(() => Ocorrencias, ocorrencia => ocorrencia.likes)
  ocorrencia: Ocorrencias;

  @Column()
  ocorrenciaId: number;
}