import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Like } from './like.entity';
import { LikesService } from './like.service';
import { LikesController } from './like.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}