import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ocorrencias } from './ocorrencias.entity';
import { OcorrenciasService } from './ocorrencias.service';
import { OcorrenciasController } from './ocorrencias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ocorrencias])],
  providers: [OcorrenciasService],
  controllers: [OcorrenciasController],
})
export class OcorrenciasModule {}

