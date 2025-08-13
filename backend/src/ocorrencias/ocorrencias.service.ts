import { Injectable, NotFoundException } from '@nestjs/common';
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
  

  create(data: Partial<Ocorrencias>) {
    const ocorrencia  = this.repo.create(data);
    return this.repo.save(ocorrencia );
  }

  findAll() {
    return this.repo.find({ relations: ['likes'] });
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
}
