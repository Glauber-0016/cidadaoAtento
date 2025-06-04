
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async register(username: string, password: string) {
    const existing = await this.userRepo.findOne({ where: { username } });
    if (existing) throw new Error('Usuário já existe');
    const hash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ username, password: hash });
    return this.userRepo.save(user);
  }

  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) throw new Error('Usuário não encontrado');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Senha inválida');
    return { message: 'Login bem-sucedido', userId: user.id };
  }
}
