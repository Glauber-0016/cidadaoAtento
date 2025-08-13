import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comentario } from './comentario.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario) private repo: Repository<Comentario>,
  ) {}

  create(data: Partial<Comentario>) {
    const comentario = this.repo.create(data);
    return this.repo.save(comentario);
  }

  findByOcorrenciaId(ocorrenciaId: number) {
    return this.repo.find({
      where: { ocorrenciaId },
      order: { data_criacao: 'ASC' }, // ASC ordena os comentarios (ascendent)
    });
  }
}