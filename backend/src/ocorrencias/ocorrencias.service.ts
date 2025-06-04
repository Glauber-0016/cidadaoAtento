
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ocorrencias } from './ocorrencias.entity';

@Injectable()
export class OcorrenciasService {
  constructor(
    @InjectRepository(Ocorrencias)
    private repo: Repository<Ocorrencias>,
  ) {}

  create(data: Partial<Ocorrencias>) {
    const ocorrencia  = this.repo.create(data);
    return this.repo.save(ocorrencia );
  }

  findAll() {
    return this.repo.find();
  }
}
