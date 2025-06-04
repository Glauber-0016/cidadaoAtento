
import { Controller, Post, Body, Get } from '@nestjs/common';
import { OcorrenciasService } from './ocorrencias.service';
import { Ocorrencias } from './ocorrencias.entity';

@Controller('ocorrencias')
export class OcorrenciasController {
  constructor(private service: OcorrenciasService) {}

  @Post()
  create(@Body() data: Partial<Ocorrencias>) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}

