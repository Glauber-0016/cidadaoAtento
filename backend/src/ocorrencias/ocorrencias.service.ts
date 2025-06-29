
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ocorrencias } from './ocorrencias.entity';

@Injectable()
export class OcorrenciasService {
  constructor(@InjectRepository(Ocorrencias) private repo: Repository<Ocorrencias>,) {}

  
async updateStatus(id: string, newStatus: string): Promise<Ocorrencias> {
    const ocorrenciaToUpdate = await this.repo.preload({
      id: parseInt(id),
      status: newStatus, // <-- Garanta que aqui também seja 'status' (ou o nome real da coluna no seu BD/Entidade)
    });

    if (!ocorrenciaToUpdate) {
      throw new NotFoundException(`Ocorrência com ID "${id}" não encontrada.`);
    }

    return this.repo.save(ocorrenciaToUpdate);
}
  

  create(data: Partial<Ocorrencias>) {
    const ocorrencia  = this.repo.create(data);
    return this.repo.save(ocorrencia );
  }

  findAll() {
    return this.repo.find();
  }
}
