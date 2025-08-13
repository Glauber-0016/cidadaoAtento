import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comentario } from './comentario.entity';
import { ComentariosService } from './comentario.service';
import { ComentariosController } from './comentario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario])],
  providers: [ComentariosService],
  controllers: [ComentariosController],
})
export class ComentariosModule {}