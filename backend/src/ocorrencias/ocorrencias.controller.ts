import { Controller, Post, Body, Get, UseInterceptors, UploadedFiles,Param,Patch,BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OcorrenciasService } from './ocorrencias.service';
import { Ocorrencias } from './ocorrencias.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('ocorrencias')
export class OcorrenciasController {
  constructor(private service: OcorrenciasService) {}
  @Patch(':id/status')
  async updateOccurrenceStatus(@Param('id') id: string, @Body() body: { status: string }) {
    try {
      const updatedOccurrence = await this.service.updateStatus(id, body.status); 
      return updatedOccurrence;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('imagens', 5, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
        callback(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))

  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: Partial<Ocorrencias>
  ) {
    const fileNames = files?.map(file => file.filename) || [];
    return this.service.create({ ...data, imagens: fileNames.join(',') });
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id/prioridade')
  async updateOccurrencePrioridade(@Param('id') id: string, @Body() body: { prioridade: string }) {
    try {
      const updatedOccurrence = await this.service.updatePrioridade(id, body.prioridade);
      return updatedOccurrence;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.service.findByStatus(status);
  }

  @Get('user/:userId')
  findOccurrencesByUser(@Param('userId') userId: string) {
    return this.service.findByUserId(parseInt(userId, 10));
  }

  @Post(':id/avaliar')
  async avaliarOcorrencia(@Param('id') id: string, @Body() body: any) {
      const { nota, comentario } = body;
      
      if (!nota || nota < 1 || nota > 5) {
          throw new BadRequestException('Nota deve ser entre 1 e 5');
      }

      if (comentario && comentario.length > 500) {
          throw new BadRequestException('Comentário muito longo');
      }

      return this.service.avaliarOcorrencia(
          parseInt(id),
          nota,
          comentario
      );
  }
}
