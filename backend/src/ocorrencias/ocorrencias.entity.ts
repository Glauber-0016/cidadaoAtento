import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { Comentario } from '../comentarios/comentario.entity';
import { Like } from '../likes/like.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Ocorrencias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true }) 
  userId: number;

  @ManyToOne(() => User, {
    eager: false,
    nullable: true,
    createForeignKeyConstraints: false,
  })
  
  @JoinColumn({ name: 'userId' })
  usuario?: User;

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

  @Column({ default: 'media' })
  prioridade: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', name: 'data_ocorrencia' })
  data_ocorrencia: Date;

  @OneToMany(() => Comentario, comentario => comentario.ocorrencia) 
  comentarios: Comentario[];

  @OneToMany(() => Like, like => like.ocorrencia) 
  likes: Like[];

  @Column({ type: 'text', nullable: true })
    avaliacao?: string; 

}


