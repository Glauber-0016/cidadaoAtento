import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ocorrencias } from './ocorrencias.entity';
import { OcorrenciasService } from './ocorrencias.service';
import { OcorrenciasController } from './ocorrencias.controller';

import { User } from '../auth/user.entity';
import { MailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ocorrencias, User]),
    MailModule,
  ],
  providers: [OcorrenciasService],
  controllers: [OcorrenciasController],
})
export class OcorrenciasModule {}

