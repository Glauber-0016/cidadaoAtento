import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Like } from './like.entity';

@Injectable()
export class LikesService {
  constructor(@InjectRepository(Like) private repo: Repository<Like>) {}

  async toggleLike(ocorrenciaId: number, userId: number) {
    const existingLike = await this.repo.findOne({ where: { ocorrenciaId, userId } });

    if (existingLike) {
      await this.repo.remove(existingLike);
      return { liked: false };
      
    } else {

      const newLike = this.repo.create({ ocorrenciaId, userId });
      await this.repo.save(newLike);
      return { liked: true };
    }
  }

  async countLikes(ocorrenciaId: number): Promise<number> {
      return this.repo.count({ where: { ocorrenciaId } });
  }
}