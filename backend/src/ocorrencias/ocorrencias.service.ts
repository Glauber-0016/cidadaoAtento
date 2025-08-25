import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ocorrencias } from './ocorrencias.entity';
import { MailService } from '../email//email.service';
import { User } from '../auth/user.entity';

@Injectable()
export class OcorrenciasService {
  constructor(
    @InjectRepository(Ocorrencias) private repo: Repository<Ocorrencias>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly emailService: MailService, 
  ) {}
  
async updateStatus(id: string, newStatus: string): Promise<Ocorrencias> {
    const ocorrenciaToUpdate = await this.repo.preload({
      id: parseInt(id),
      /*status: newStatus,*/
    });

    if (!ocorrenciaToUpdate) {
      throw new NotFoundException(`Ocorrência com ID "${id}" não encontrada.`);
    }

    ocorrenciaToUpdate.status = newStatus;
    await this.repo.save(ocorrenciaToUpdate);

    if (ocorrenciaToUpdate.userId) {
      const usuario = await this.userRepo.findOne({ where: { id: ocorrenciaToUpdate.userId } });
      if (usuario?.email) {
        const occurrenceName = ocorrenciaToUpdate.nome || 'Sua ocorrência';
        await this.emailService.sendStatusUpdateEmail(
          usuario.email,
          ocorrenciaToUpdate.nome,
          newStatus,
        );
      }
    }

    return ocorrenciaToUpdate;
}
  
  async updatePrioridade(id: string, newPrioridade: string): Promise<Ocorrencias> {
    const ocorrenciaToUpdate = await this.repo.preload({
      id: parseInt(id, 10),
    });
    if (!ocorrenciaToUpdate) {
      throw new NotFoundException(`Ocorrência com ID "${id}" não encontrada.`);
    }
    ocorrenciaToUpdate.prioridade = newPrioridade;

    return this.repo.save(ocorrenciaToUpdate);
  }

  create(data: Partial<Ocorrencias>) {
    const ocorrencia  = this.repo.create(data);
    return this.repo.save(ocorrencia );
  }

  async findAll() {
    const ocorrencias = await this.repo.find({ relations: ['likes'] });
    return ocorrencias.map(oc => ({
        ...oc,
        avaliacao: oc.avaliacao ? JSON.parse(oc.avaliacao) : null
    }));
  }

  findByUserId(userId: number) {
    return this.repo.find({
      where: { userId },
      order: { data_ocorrencia: 'DESC' } 
    });
  }

  async findByStatus(status: string) {
    return this.repo.find({ 
        where: { status },
        order: { data_ocorrencia: 'DESC' }
    });
  }

  async avaliarOcorrencia(id: number, nota: number, comentario?: string) {
    const ocorrencia = await this.repo.findOne({
        where: { id }
    });

    if (!ocorrencia) {
        throw new NotFoundException('Ocorrência não encontrada');
    }

    if (ocorrencia.status !== 'concluido') {
        throw new BadRequestException('Só é possível avaliar ocorrências concluídas');
    }

    const avaliacao = {
      nota: nota,
      comentario: comentario || '',
      data_avaliacao: new Date().toISOString()
    };

    ocorrencia.avaliacao = JSON.stringify(avaliacao);

    return this.repo.save(ocorrencia);
  }

  async findUserOcorrencias(userId: number) {
    const ocorrencias = await this.repo.find({
        where: { userId },
        order: { data_ocorrencia: 'DESC' }
    });

    return ocorrencias.map(oc => ({
        ...oc,
        avaliacao: oc.avaliacao ? JSON.parse(oc.avaliacao) : null
    }));
  }
}
