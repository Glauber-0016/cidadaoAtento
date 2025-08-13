import { Controller, Post, Body, Param, Get } from '@nestjs/common';

import { LikesService } from './like.service';

@Controller('ocorrencias/:ocorrenciaId/likes')
export class LikesController {
  constructor(private service: LikesService) {}

  @Post()
  toggleLike(
    @Param('ocorrenciaId') ocorrenciaId: string,
    @Body() body: { userId: number } 
  ) {
    return this.service.toggleLike(parseInt(ocorrenciaId), body.userId);
  }

  @Get()
  getLikesCount(@Param('ocorrenciaId') ocorrenciaId: string) {
      return this.service.countLikes(parseInt(ocorrenciaId));
  }
}