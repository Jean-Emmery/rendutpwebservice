import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipeModule } from './equipe/equipe.module';
import { MatchModule } from './match/match.module';

const username = 'root';
const password = 'root';
const host = 'cluster0.mwhml.mongodb.net';
const databaseName = 'rendutp';
const mongoDbUri = `mongodb+srv://${username}:${password}@${host}/${databaseName}`;

@Module({
  imports: [MongooseModule.forRoot(mongoDbUri), EquipeModule, MatchModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
