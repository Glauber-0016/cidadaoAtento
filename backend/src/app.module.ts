import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { OcorrenciasModule } from './ocorrencias/ocorrencias.module';
import { ComentariosModule } from './comentarios/comentario.module';
import { LikesModule } from './likes/like.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'cidadao_atento',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    AuthModule,

    OcorrenciasModule, 
    ComentariosModule,
    LikesModule,

  ],
})
export class AppModule {}
