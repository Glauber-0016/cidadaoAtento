import { Controller, Post, Body, Get, Param, BadRequestException } from '@nestjs/common';

import { ComentariosService } from './comentario.service';

@Controller('comentarios')
export class ComentariosController {
  constructor(private service: ComentariosService) {}

  @Post()
  createComment(@Body() body: { nome: string; texto: string; ocorrenciaId: number }) {
    if (!body.nome || !body.texto || !body.ocorrenciaId) {
      throw new BadRequestException('Dados do comentário incompletos.');
    }
    return this.service.create(body);
  }

  @Get(':ocorrenciaId')
  getCommentsByOccurrence(@Param('ocorrenciaId') ocorrenciaId: string) {
    return this.service.findByOcorrenciaId(parseInt(ocorrenciaId));
  }
}