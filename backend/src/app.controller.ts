import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller()
export class AppController {
  @Get('uploads/:filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    const path = join(__dirname, '..', 'uploads', filename);
    if (existsSync(path)) {
      return res.sendFile(path);
    }
    return res.status(404).send('Imagem não encontrada');
  }
}