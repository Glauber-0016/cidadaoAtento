
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string, cpf: string, email: string }, @Res() res: Response) {
    try {
      const user = await this.authService.register(body.username, body.password, body.cpf, body.email);
      res.status(HttpStatus.CREATED).json({ message: 'Usuário criado', user });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Res() res: Response) {
    try {
      const result = await this.authService.login(body.username, body.password);
      res.status(HttpStatus.OK).json(result);
    } catch (err) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: err.message });
    }
  }
}